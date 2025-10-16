package com.thesensationals.campuslearn.dto;

public class AuthRequest {
    
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    
    // 🚀 ADDED: Field for registration role
    private String role; 

    // --- Getters ---
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }

    // --- Setters (Essential for Spring/Jackson) ---
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
}