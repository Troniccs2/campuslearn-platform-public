package com.thesensationals.campuslearn.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.dto.AuthRequest;
import com.thesensationals.campuslearn.dto.AuthResponse;
import com.thesensationals.campuslearn.dto.PasswordResetRequest;
import com.thesensationals.campuslearn.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth") 
public class AuthController {
    
    private final AuthenticationService authenticationService;

    // Manual Constructor Injection
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    // 1. REGISTRATION ENDPOINT (POST /api/auth/register)
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authenticationService.register(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            
            // 🏆 CRITICAL DEBUGGING & ERROR HANDLING 🏆
            System.err.println("--- Registration Exception Caught (Log below) ---");
            e.printStackTrace(); // <-- Print the full stack trace to the console
            System.err.println("-------------------------------------------------");
            
            String errorMessage = e.getMessage() != null ? e.getMessage() : "An unknown error occurred during registration.";
            
            // Check for the *expected* business logic exception (Email already in use)
            if (errorMessage.contains("Email is already registered")) {
                // Return 409 Conflict for a business logic error
                return new ResponseEntity<>(
                    new AuthResponse("Registration failed. This email may already be in use."), 
                    HttpStatus.CONFLICT // 409
                );
            } 
            
            // Handle request body validation issues (e.g., fields missing/invalid)
            // Note: For best practice, use @Valid, but for debugging now:
            if (e instanceof NullPointerException) {
                // This is likely caused by missing mandatory fields (firstName/lastName) in the JSON payload
                return new ResponseEntity<>(
                    new AuthResponse("Registration failed: Missing required fields (firstName or lastName). Check payload."), 
                    HttpStatus.BAD_REQUEST // 400
                );
            }
            
            // Handle all other unexpected exceptions (e.g., database connection down, coding bug)
            return new ResponseEntity<>(
                new AuthResponse("Registration failed due to an unexpected server error."), 
                HttpStatus.INTERNAL_SERVER_ERROR // 500
            );
        }
    }

    // 2. LOGIN ENDPOINT (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authenticationService.login(request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                new AuthResponse("Login failed: " + e.getMessage()), 
                HttpStatus.UNAUTHORIZED // 401
            );
        }
    }
    
    // 3. FORGOT PASSWORD ENDPOINT (POST /api/auth/forgot-password)
    @PostMapping("/forgot-password")
    public ResponseEntity<AuthResponse> forgotPassword(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authenticationService.generateResetToken(request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                new AuthResponse("Token generation failed: " + e.getMessage()), 
                HttpStatus.NOT_FOUND // 404
            );
        }
    }

    // 4. RESET PASSWORD ENDPOINT (POST /api/auth/reset-password)
    @PostMapping("/reset-password")
    public ResponseEntity<AuthResponse> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            AuthResponse response = authenticationService.resetPassword(request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                new AuthResponse("Password reset failed: " + e.getMessage()), 
                HttpStatus.BAD_REQUEST // 400
            );
        }
    }
}