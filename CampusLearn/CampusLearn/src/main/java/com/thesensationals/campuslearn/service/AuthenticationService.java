package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

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

    // 1. REGISTRATION LOGIC (Updated to save role)
    public AuthResponse register(AuthRequest request) throws Exception {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("Email is already registered.");
        }

        // 🚀 NEW: Validate and set the user's role from the request
        String roleString = request.getRole();
        Role userRole;

        try {
            // Registration allows only STUDENT or TUTOR roles
            if (roleString == null) {
                throw new IllegalArgumentException("Role selection is mandatory.");
            } else if (roleString.equalsIgnoreCase("STUDENT")) {
                userRole = Role.STUDENT;
            } else if (roleString.equalsIgnoreCase("TUTOR")) {
                userRole = Role.TUTOR;
            } else {
                // Prevents non-admin registration from attempting to claim ADMIN role
                throw new IllegalArgumentException("Invalid role selected. Must be Student or Tutor.");
            }
        } catch (IllegalArgumentException e) {
            throw new Exception(e.getMessage());
        }

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        newUser.setRole(userRole); // 🚀 SET THE ROLE

        String encodedPassword = passwordEncoder.encode(request.getPassword());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);

        // Send back the user's role in the response
        return new AuthResponse("User successfully registered! You can now log in.", userRole.name());
    }

    // 2. LOGIN LOGIC (Updated to return role)
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

        // 🚀 CRITICAL: Return the user's role for frontend redirection
        return new AuthResponse("Login successful! Welcome back, " + user.getFirstName() + ".", user.getRole().name());
    }
    
    // 3. FORGOT PASSWORD (Initiate Token Generation - Unchanged)
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

    // 4. RESET PASSWORD (Use Token to set New Password - Unchanged)
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
    
    // 🚀 NEW: Method for initial Admin User creation (called by CommandLineRunner)
    public void createInitialAdminUser(String email, String password, String firstName, String lastName) {
        // Check if an admin already exists using the new repository method
        Optional<User> adminOptional = userRepository.findByRole(Role.ADMIN); 

        if (adminOptional.isEmpty()) {
            User adminUser = new User();
            adminUser.setFirstName(firstName);
            adminUser.setLastName(lastName);
            adminUser.setEmail(email);
            adminUser.setRole(Role.ADMIN); // 🚀 Set the ADMIN role
            adminUser.setPassword(passwordEncoder.encode(password));
            
            userRepository.save(adminUser);
            System.out.println("--- CRITICAL: Initial ADMIN user created! Email: " + email + " ---");
        }
    }
}