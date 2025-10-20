package com.thesensationals.campuslearn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.Role; 
import com.thesensationals.campuslearn.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    
    Optional<User> findByResetToken(String resetToken);
    
    // 🚀 ADDED: Custom finder method to check for an existing Admin user
    Optional<User> findByRole(Role role); 

    // Find all users having a specific role (e.g., all tutors)
    java.util.List<User> findAllByRole(Role role);

    // Search users by first name, last name or email (used by messaging search)
    java.util.List<User> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
        String firstName, String lastName, String email);
}