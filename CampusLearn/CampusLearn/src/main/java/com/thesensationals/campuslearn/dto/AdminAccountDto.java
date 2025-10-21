package com.thesensationals.campuslearn.dto;

/**
 * Simple DTO returned by the admin account management endpoints so the
 * frontend does not need to know about the internal User entity fields.
 */
public record AdminAccountDto(
        Long id,
        String fullName,
        String studentId,
        String certification,
        String role,
        Boolean approved
) {
}
