package com.thesensationals.campuslearn.dto;

public class AuthResponse {
    private String message;

    public AuthResponse() {}
    public AuthResponse(String message) {
        this.message = message;
    }
    
    // Getter/Setter
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}