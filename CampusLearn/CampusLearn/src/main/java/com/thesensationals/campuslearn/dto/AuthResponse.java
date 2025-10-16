package com.thesensationals.campuslearn.dto;

public class AuthResponse {
    
    private String message;
    private String userRole; // 🚀 ADDED: Field to carry the role back to the frontend

    // Constructor for registration/login success (with role)
    public AuthResponse(String message, String userRole) {
        this.message = message;
        this.userRole = userRole;
    }
    
    // Constructor for general messages (e.g., password reset, simple messages)
    public AuthResponse(String message) {
        this.message = message;
        this.userRole = null; 
    }

    // Getters
    public String getMessage() { return message; }
    public String getUserRole() { return userRole; }
    
    // Setters (Optional but good practice)
    public void setMessage(String message) { this.message = message; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
}