package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.dto.UserDto;
import com.thesensationals.campuslearn.model.Role;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Endpoint to fetch all users with the STUDENT role.
     * GET /api/users/students
     */
    @GetMapping("/students")
    public ResponseEntity<List<UserDto>> getAllStudents() {
        // 1. Fetch all User entities with the 'STUDENT' role.
        List<User> students = userRepository.findAllByRole(Role.STUDENT);

        // 2. Map the User entities to DTOs.
        List<UserDto> studentDtos = students.stream()
            .map(this::mapUserToDto)
            .collect(Collectors.toList());

        return ResponseEntity.ok(studentDtos);
    }

    // Mapper method to convert User entity to a safe DTO (using the new record)
    private UserDto mapUserToDto(User user) {
        return new UserDto(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail()
        );
    }
}