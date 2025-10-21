package com.thesensationals.campuslearn.dto;

import com.thesensationals.campuslearn.model.Role;

/**
 * Data Transfer Object (DTO) for returning non-sensitive User information
 * to the frontend.
 * * This DTO matches the 5 required arguments needed by UserController.java.
 * It also includes a convenience constructor to easily convert the User model
 * (which uses the Role enum) into this DTO (which uses a String for serialization).
 */
public record UserDto(
    Long id,
    String email,
    String firstName,
    String lastName,
    // The role is included as a String, matching the 5th argument in the error log.
    String role
) {
    // Convenience constructor to convert the User model (with Role enum) to this DTO
    public UserDto(Long id, String email, String firstName, String lastName, Role role) {
        // We use role.name() to get the String value required by the DTO's main constructor
        this(id, email, firstName, lastName, role.name());
    }
}
