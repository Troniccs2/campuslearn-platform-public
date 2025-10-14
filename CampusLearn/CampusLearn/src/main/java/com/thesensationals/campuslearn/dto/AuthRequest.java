package com.thesensationals.campuslearn.dto;

public class AuthRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // Getters only needed for service access (No Lombok!)
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
}