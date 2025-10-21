package com.thesensationals.campuslearn.dto;

/**
 * Data Transfer Object (DTO) representing a simplified User model using Java Record.
 * This DTO defines the exact fields the frontend expects for student/user display:
 * ID, first name, last name, email, and the user's role.
 * Records are immutable and automatically provide a constructor, getters, hashCode, and equals.
 */
public record UserDto(
    Long id,
    String firstName,
    String lastName,
    String email,
    String role // Added the role field for front-end consumption
) {}
