package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.thesensationals.campuslearn.dto.AdminAccountDto;
import com.thesensationals.campuslearn.model.Role;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.UserRepository;

@Service
public class AdminAccountService {

    private final UserRepository userRepository;

    public AdminAccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AdminAccountDto> listAllUsers() {
    return userRepository.findAll().stream()
        .filter(user -> user.getRole() != Role.ADMIN)
        .map(this::toDto)
        .collect(Collectors.toList());
    }

    public AdminAccountDto getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public AdminAccountDto approveUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        // TODO: Persist approval once a dedicated field exists.
        return toDto(user);
    }

    public void deleteUser(Long id) {
        User target = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Optional<String> currentUsername = getCurrentUsername();
        if (currentUsername.isPresent() && target.getEmail() != null
                && target.getEmail().equalsIgnoreCase(currentUsername.get())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administrators cannot delete their own account");
        }

        userRepository.deleteById(id);
    }

    private AdminAccountDto toDto(User user) {
        String first = user.getFirstName() != null ? user.getFirstName().trim() : "";
        String last = user.getLastName() != null ? user.getLastName().trim() : "";
        String fullName = (first + " " + last).trim();
        if (fullName.isEmpty()) {
            fullName = user.getEmail() != null ? user.getEmail() : "";
        }

        Role role = user.getRole();
        String roleLabel = role != null ? switch (role) {
            case ADMIN -> "Admin";
            case TUTOR -> "Tutor";
            case STUDENT -> "Student";
        } : null;

        return new AdminAccountDto(
                user.getId(),
                fullName,
                null,
                "",
                roleLabel,
                Boolean.TRUE
        );
    }

    private Optional<String> getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails userDetails) {
            return Optional.ofNullable(userDetails.getUsername());
        }

        if (principal instanceof String str && !"anonymousUser".equalsIgnoreCase(str)) {
            return Optional.of(str);
        }

        return Optional.empty();
    }
}
