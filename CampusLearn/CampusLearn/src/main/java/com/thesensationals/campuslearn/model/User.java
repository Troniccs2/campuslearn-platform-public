package com.thesensationals.campuslearn.model;

/**
 * Data Transfer Object (DTO) representing a User.
 * Manually implements getters, setters, and constructors, replacing Lombok's @Data.
 */
public class User {
    private String email;
    private String firstName;
    private String role; // STUDENT, TUTOR, ADMIN

    // NoArgsConstructor
    public User() {
    }

    // AllArgsConstructor
    public User(String email, String firstName, String role) {
        this.email = email;
        this.firstName = firstName;
        this.role = role;
    }

    // --- Getters ---
    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getRole() {
        return role;
    }

    // --- Setters ---
    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
