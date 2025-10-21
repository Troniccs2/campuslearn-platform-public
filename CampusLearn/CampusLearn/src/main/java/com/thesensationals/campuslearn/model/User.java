package com.thesensationals.campuslearn.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

/**
 * The primary JPA Entity model for a User, which also implements
 * Spring Security's UserDetails interface to enable authentication.
 * * This class fixes all previous compilation errors by providing the missing:
 * 1. getId() and getLastName() methods.
 * 2. Implementation of UserDetails (for UserDetailsServiceImpl).
 */
@Entity
@Table(name = "users")
public class User implements UserDetails {

    // --- Core Model Fields ---
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Required for getId() errors

    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName; // Required for getLastName() errors

    // We store the role as a simple string (e.g., "TUTOR", "STUDENT")
    @Column(nullable = false)
    private String role; 

    // --- Constructors ---
    public User() {
    }

    // New convenience constructor to resolve the errors in AuthenticationService's MockUserRepository
    public User(String email, String firstName, String role) {
        // Calls the full constructor, providing mock values for password ("pass") and lastName ("MockUser")
        this(email, "pass", firstName, "MockUser", role);
    }

    public User(String email, String password, String firstName, String lastName, String role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    // --- Getters and Setters (POJO style) ---
    // Required by ConversationService and UserController
    public Long getId() { 
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Required by UserController
    public String getLastName() { 
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Spring Security requires a method called getPassword()
    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    // --- UserDetails Implementation (Required for Spring Security) ---
    
    /**
     * Maps the role string (e.g., "ADMIN") to a list of GrantedAuthority objects (e.g., "ROLE_ADMIN").
     * This is crucial for access control (e.g., .hasRole("ADMIN")).
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // We prepend "ROLE_" to the stored role to conform to standard Spring Security convention
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

    /**
     * Fixes the getUsername() error in ResponseDTO and is the primary identifier for Spring Security.
     * We use the email as the username.
     */
    @Override
    public String getUsername() {
        return email;
    }

    // The rest of the methods are boilerplate for non-expired/locked accounts
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
