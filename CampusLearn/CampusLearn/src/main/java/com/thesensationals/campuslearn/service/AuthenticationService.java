package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.dto.AuthRequest;
import com.thesensationals.campuslearn.dto.AuthResponse;
import com.thesensationals.campuslearn.dto.PasswordResetRequest;
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

    // 1. REGISTRATION LOGIC
    public AuthResponse register(AuthRequest request) throws Exception {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("Email is already registered.");
        }

        User newUser = new User();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setEmail(request.getEmail());
        
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        newUser.setPassword(encodedPassword);

        userRepository.save(newUser);

        return new AuthResponse("User successfully registered! You can now log in.");
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

        // NOTE: In a real app, you would generate and return a JWT token here.
        return new AuthResponse("Login successful! Welcome back, " + user.getFirstName() + ".");
    }
    
    // 3. FORGOT PASSWORD (Initiate Token Generation)
    public AuthResponse generateResetToken(AuthRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new Exception("User not found for this email."));

        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1);

        user.setResetToken(token);
        user.setTokenExpiryDate(expiryDate);
        userRepository.save(user);

        // NOTE: You would send an email here in a complete solution.
        return new AuthResponse("Password reset initiated. Token: " + token + " (Valid for 1 hour).");
    }

    // 4. RESET PASSWORD (Use Token to set New Password)
    public AuthResponse resetPassword(PasswordResetRequest request) throws Exception {
        User user = userRepository.findByResetToken(request.getToken())
                .orElseThrow(() -> new Exception("Invalid reset token."));

        if (user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new Exception("Reset token has expired.");
        }

        String encodedPassword = passwordEncoder.encode(request.getNewPassword());
        user.setPassword(encodedPassword);

        // Clear the token fields after successful reset
        user.setResetToken(null);
        user.setTokenExpiryDate(null);
        userRepository.save(user);

        return new AuthResponse("Password successfully reset.");
    }
}