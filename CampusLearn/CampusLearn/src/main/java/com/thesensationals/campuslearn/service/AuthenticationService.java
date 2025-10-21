package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.User;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.Optional;

// This service is marked with @Service, replacing any potential @Component or related Lombok annotations.
@Service
public class AuthenticationService {

    // Mock UserRepository or data source (normally injected)
    // In a real application, this would query a database.
    private final MockUserRepository userRepository = new MockUserRepository();
    private static final String BASIC_AUTH_PREFIX = "Basic ";

    /**
     * Validates credentials provided via a Basic Authorization token.
     *
     * @param authorizationHeader The full Authorization header string (e.g., "Basic dXNlcjpwYXNz").
     * @return An Optional containing the User object if authentication is successful, otherwise empty.
     */
    public Optional<User> authenticateBasic(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith(BASIC_AUTH_PREFIX)) {
            return Optional.empty();
        }

        String base64Credentials = authorizationHeader.substring(BASIC_AUTH_PREFIX.length());

        try {
            // Decode the Base64 token
            byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
            String credentials = new String(decodedBytes);
            
            // Credentials should be in the format "email:password"
            String[] parts = credentials.split(":", 2);

            if (parts.length != 2) {
                // Invalid format
                return Optional.empty();
            }

            String email = parts[0];
            String password = parts[1];

            // 1. Find the user by email
            Optional<User> userOptional = userRepository.findByEmail(email);

            if (userOptional.isEmpty()) {
                return Optional.empty(); // User not found
            }

            User user = userOptional.get();

            // 2. Perform password validation (Mocked here, but would use a password encoder like BCrypt in real app)
            // NOTE: Never store plain passwords! This is a mock for demonstration.
            if (userRepository.validatePassword(user.getEmail(), password)) {
                return Optional.of(user); // Authentication successful
            } else {
                return Optional.empty(); // Invalid password
            }

        } catch (IllegalArgumentException e) {
            // Catches invalid Base64 string
            System.err.println("Error decoding Base64 token: " + e.getMessage());
            return Optional.empty();
        } catch (Exception e) {
            // General error during authentication
            System.err.println("Authentication error: " + e.getMessage());
            return Optional.empty();
        }
    }

    /**
     * Mock class to simulate a UserRepository and database lookups.
     * This replaces a class that might have used @Repository and injected dependencies.
     */
    private static class MockUserRepository {
        // Mock data store
        private final java.util.Map<String, User> mockUsers = new java.util.HashMap<>();

        public MockUserRepository() {
            // Mock users for different roles
            mockUsers.put("student@test.com", new User("student@test.com", "Student", "STUDENT"));
            mockUsers.put("tutor@test.com", new User("tutor@test.com", "Tutor", "TUTOR"));
            mockUsers.put("admin@test.com", new User("admin@test.com", "Admin", "ADMIN"));
        }

        public Optional<User> findByEmail(String email) {
            return Optional.ofNullable(mockUsers.get(email));
        }

        // Mock password validation (checks against the fixed mock password "pass")
        public boolean validatePassword(String email, String providedPassword) {
            // In a real scenario, you'd use a secure hash check (e.g., BCrypt.checkpw)
            return providedPassword.equals("pass") && mockUsers.containsKey(email);
        }
    }
}
