package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.core.Authentication; 
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
    private final EmailService emailService; // Inject EmailService

    // Manual Constructor Injection (Standard Spring practice)
    // NOTE: If you use @RequiredArgsConstructor/etc. on this class, you can remove this block.
    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    // 1. REGISTRATION LOGIC
    public AuthResponse register(AuthRequest request) throws Exception {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("Email is already registered.");
        }
        // ... (rest of registration logic) ...
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

    // 2. LOGIN LOGIC
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

    // 3. FORGOT PASSWORD (Generates token and sends email)
    public AuthResponse generateResetToken(AuthRequest request) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        // Fail silently if user not found (security best practice)
        if (userOptional.isEmpty()) {
            return new AuthResponse("If an account exists, a password reset link has been sent to your email."); 
        }
        
        User user = userOptional.get();
        
        String token = UUID.randomUUID().toString();
        // Set expiry to 15 minutes
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(15); 

        // Uses standard non-Lombok setters (e.g., user.setResetToken())
        user.setResetToken(token);
        user.setTokenExpiryDate(expiryDate);
        userRepository.save(user);

        // Call the non-Lombok EmailService
        emailService.sendPasswordResetEmail(user.getEmail(), token);

        return new AuthResponse("If an account exists, a password reset link has been sent to your email.");
    }

    // 4. RESET PASSWORD (Validates token and updates password)
    public AuthResponse resetPassword(PasswordResetRequest request) throws Exception {
        Optional<User> userOptional = userRepository.findByResetToken(request.getToken());

        if (userOptional.isEmpty()) {
            throw new Exception("Invalid or used reset link. Please request a new one.");
        }
        
        User user = userOptional.get();

        if (user.getTokenExpiryDate() == null || user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            // Clear expired token fields to prevent re-use
            user.setResetToken(null);
            user.setTokenExpiryDate(null);
            userRepository.save(user); 
            throw new Exception("Reset link has expired. Please request a new one.");
        }

        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword);

        // Clear token fields after a successful reset
        user.setResetToken(null);
        user.setTokenExpiryDate(null);
        userRepository.save(user);

        return new AuthResponse("Password successfully reset.");
    }
    
    // ... (rest of methods like createInitialAdminUser, getCurrentUser) ...

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
    
    public Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty(); // No user authenticated
        }

        Object principal = authentication.getPrincipal();

        if (principal.equals("anonymousUser")) { 
             return Optional.empty(); // Explicitly handle the unauthenticated principal
        }
        
        String username = null;
        
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            username = (String) principal;
        }

        if (username != null && !username.equalsIgnoreCase("anonymousUser")) {
            return userRepository.findByEmail(username);
        }
        
        return Optional.empty();
    }
}