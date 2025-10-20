package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.Authentication; // 🚨 NEW IMPORT
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.dto.AuthRequest;
import com.thesensationals.campuslearn.dto.AuthResponse;
import com.thesensationals.campuslearn.dto.PasswordResetRequest;
import com.thesensationals.campuslearn.model.Role;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.UserRepository;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // [REGISTRATION, LOGIN, FORGOT, RESET PASSWORD, INITIAL ADMIN CREATION METHODS REMAIN UNCHANGED]

    // ... (1. REGISTRATION LOGIC)
    public AuthResponse register(AuthRequest request) throws Exception {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("Email is already registered.");
        }

        String roleString = request.getRole();
        Role userRole;

        try {
            if (roleString == null) {
                throw new IllegalArgumentException("Role selection is mandatory.");
            } else if (roleString.equalsIgnoreCase("STUDENT")) {
                userRole = Role.STUDENT;
            } else if (roleString.equalsIgnoreCase("TUTOR")) {
                userRole = Role.TUTOR;
            } else {
                throw new IllegalArgumentException("Invalid role selected. Must be Student or Tutor.");
            }
        } catch (IllegalArgumentException e) {
            throw new Exception(e.getMessage());
        }

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        newUser.setRole(userRole);

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);

        return new AuthResponse("User successfully registered! You can now log in.", userRole.name());
    }

    // ... (2. LOGIN LOGIC)
    public AuthResponse login(AuthRequest request) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            throw new Exception("User not found.");
        }

        User user = userOptional.get();

        boolean isPasswordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!isPasswordMatch) {
            throw new Exception("Invalid credentials.");
        }

        return new AuthResponse("Login successful! Welcome back, " + user.getFirstName() + ".", user.getRole().name());
    }

    // ... (3. FORGOT PASSWORD)
    public AuthResponse generateResetToken(AuthRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new Exception("User not found for this email."));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

        user.setResetToken(token);
        user.setTokenExpiryDate(expiryDate);
        userRepository.save(user);

        return new AuthResponse("Password reset initiated. A link has been sent to your email.");
    }

    // ... (4. RESET PASSWORD)
    public AuthResponse resetPassword(PasswordResetRequest request) throws Exception {
        User user = userRepository.findByResetToken(request.getToken())
                .orElseThrow(() -> new Exception("Invalid reset token."));

        if (user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new Exception("Reset token has expired.");
        }

        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword);

        user.setResetToken(null);
        user.setTokenExpiryDate(null);
        userRepository.save(user);

        return new AuthResponse("Password successfully reset.");
    }

    // ... (5. INITIAL ADMIN CREATION)
    public void createInitialAdminUser(String email, String password, String firstName, String lastName) {
        Optional<User> adminOptional = userRepository.findByRole(Role.ADMIN);

        if (adminOptional.isEmpty()) {
            User adminUser = new User();
            adminUser.setFirstName(firstName);
            adminUser.setLastName(lastName);
            adminUser.setEmail(email);
            adminUser.setRole(Role.ADMIN);
            adminUser.setPassword(passwordEncoder.encode(password));

            userRepository.save(adminUser);
            System.out.println("--- CRITICAL: Initial ADMIN user created! Email: " + email + " ---");
        }
    }
    
    // 🚨 FIX: Return Optional<User> to handle unauthenticated (anonymous) access gracefully.
    public Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty(); // No user authenticated
        }

        Object principal = authentication.getPrincipal();

        // Check if the user is the default anonymous user created by Spring Security
        if (principal.equals("anonymousUser")) { 
             return Optional.empty(); // Explicitly handle the unauthenticated principal
        }
        
        String username = null;
        
        // The principal is typically the UserDetails object you created
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            // This is the fallback if the principal is a raw string (like "anonymousUser" or a username)
            username = (String) principal;
        }

        // Fetch the full User entity using the username (email)
        if (username != null && !username.equalsIgnoreCase("anonymousUser")) {
            return userRepository.findByEmail(username);
        }
        
        return Optional.empty();
    }
}