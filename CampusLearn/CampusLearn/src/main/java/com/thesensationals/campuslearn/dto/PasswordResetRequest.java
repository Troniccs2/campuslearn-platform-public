package com.thesensationals.campuslearn.dto;

public class PasswordResetRequest {
    private String newPassword;
    private String token; // The unique token the user received

    // Manual Getters/Setters/Constructor
    public PasswordResetRequest() {}
    public String getNewPassword() { return newPassword; }
    public String getToken() { return token; }
}