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
}