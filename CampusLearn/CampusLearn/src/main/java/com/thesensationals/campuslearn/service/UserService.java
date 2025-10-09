package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> findUserById(Long id);
    List<User> findAllUsers();
    User updateUser(Long id, User userDetails);
    void deleteUser(Long id);
    Optional<User> findUserByEmail(String email);
}
