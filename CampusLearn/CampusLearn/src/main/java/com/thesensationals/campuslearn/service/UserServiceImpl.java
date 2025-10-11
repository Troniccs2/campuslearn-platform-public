package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.User;
//import com.thesensationals.campuslearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Registers a new user (handles all user types: Student, Tutor, Admin).
     * NOTE: In a real app, password hashing would happen here.
     * @param user The user object to save.
     * @return The saved user object.
     */
    @Override
    public User registerUser(User user) {
        // Here you would typically hash the password before saving
        // user.setPassword_hash(hash(user.getPassword_hash()));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Updates an existing user's details.
     * @param id The ID of the user to update.
     * @param userDetails The updated user details.
     * @return The updated user object, or null if not found.
     */
    @Override
    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(userDetails.getEmail());
            user.setFirst_name(userDetails.getFirst_name());
            user.setLast_name(userDetails.getLast_name());
            // Role and password updates should be handled carefully in a real system
            // user.setRole(userDetails.getRole());
            return userRepository.save(user);
        }).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
