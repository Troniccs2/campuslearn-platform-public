package com.thesensationals.campuslearn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thesensationals.campuslearn.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Removed findByUsername to standardize on email as the login field (principal), 
    // based on User.java implementation.
    
    /**
     * PRIMARY LOGIN LOOKUP: Fetches the User by email. This is the method 
     * used by UserDetailsServiceImpl.
     */
    Optional<User> findByEmail(String email);
    
    /**
     * FIX: REQUIRED for the forgot password/reset password logic in AuthenticationService.
     */
    Optional<User> findByResetToken(String resetToken);
}