package com.thesensationals.campuslearn.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.UserRepository; // Ensure this is imported

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    // The input 'username' here is actually the user's email since that's what User.getUsername() returns.
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // FIX: Change to findByEmail to match the User entity and Repository methods
        Optional<User> userOptional = userRepository.findByEmail(username); 
        
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        
        return userOptional.get(); 
    }
}