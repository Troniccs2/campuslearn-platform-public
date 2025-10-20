package com.thesensationals.campuslearn.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.thesensationals.campuslearn.dto.AuthRequest;
import com.thesensationals.campuslearn.dto.AuthResponse;
import com.thesensationals.campuslearn.dto.PasswordResetRequest;
import com.thesensationals.campuslearn.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    // Constructor Injection
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    // 1. Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authenticationService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage()));
        }
    }

    // 2. Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authenticationService.login(request);
            // In a real application, you would add JWT generation here
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(e.getMessage()));
        }
    }

    // 3. Forgot Password Endpoint (Generate Token)
    @PostMapping("/forgot-password")
    public ResponseEntity<AuthResponse> forgotPassword(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authenticationService.generateResetToken(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the error but return a generic success message for security
            return ResponseEntity.ok(new AuthResponse("If an account exists, a password reset link has been sent to your email."));
        }
    }

    // 4. Reset Password Endpoint
    @PostMapping("/reset-password")
    public ResponseEntity<AuthResponse> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            AuthResponse response = authenticationService.resetPassword(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage()));
        }
    }
}