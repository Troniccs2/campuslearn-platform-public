package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.UserEntity;
import com.thesensationals.campuslearn.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminAccountService {

    private final UserRepository userRepository;

    public AdminAccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserEntity> listAllUsers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == null || !"ADMIN".equalsIgnoreCase(user.getRole()))
                .collect(Collectors.toList());
    }

    public UserEntity approveUser(Long id) {
        UserEntity u = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        u.setApproved(true);
        return userRepository.save(u);
    }

    public void deleteUser(Long id) {
        UserEntity target = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (target.getRole() != null && "ADMIN".equalsIgnoreCase(target.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administrator accounts cannot be modified from here");
        }
        userRepository.deleteById(id);
    }

    public UserEntity getUserById(Long id) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        if (user.getRole() != null && "ADMIN".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Administrator accounts cannot be managed via this endpoint");
        }
        return user;
    }
}
