package com.thesensationals.campuslearn.dto;

// This DTO defines the exact fields the frontend expects for a student
public record UserDto(
    Long id,
    String firstName,
    String lastName,
    String email
) {}