package com.thesensationals.campuslearn.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Optional: Add Lombok annotations back if you were using them
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;
// @Data
// @AllArgsConstructor
// @NoArgsConstructor 

@Entity
@Table(name = "users")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String lastName;
    
    @Column(unique = true, nullable = false)
    private String email; // <-- Primary login field
    
    @Column(nullable = false) // Added nullable=false for the password field
    private String password; 
    
    // Fields for Forgot Password
    private String resetToken;             
    private LocalDateTime tokenExpiryDate; 

    // Manual Constructors
    public User() {}

    // --- MANUAL GETTERS AND SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getResetToken() { return resetToken; }
    public void setResetToken(String resetToken) { this.resetToken = resetToken; }
    public LocalDateTime getTokenExpiryDate() { return tokenExpiryDate; }
    public void setTokenExpiryDate(LocalDateTime tokenExpiryDate) { this.tokenExpiryDate = tokenExpiryDate; }
    
    // --- UserDetails Implementation (The Crucial Fix) ---
    
    /**
     * FIX: Use email as the principal username for authentication.
     * Your UserDetailsService must now use userRepository.findByEmail(email).
     */
    @Override 
    public String getUsername() { 
        return email; 
    } 

    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return List.of(); } 
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}