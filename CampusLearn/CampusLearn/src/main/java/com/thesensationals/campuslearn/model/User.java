package com.thesensationals.campuslearn.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstName;
    private String lastName;
    
    private String email; 
    
    @Column(nullable = false) 
    private String password; 
    
    // Fields for Forgot Password
    private String resetToken;             
    private LocalDateTime tokenExpiryDate; 

    // 🚀 ADDED: Field to store the user's role
    @Enumerated(EnumType.STRING) // Saves the Enum name ("STUDENT", "TUTOR", "ADMIN") as a string
    @Column(nullable = false)
    private Role role; 
    
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
    
    // 🚀 ADDED: Getter and Setter for Role
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    
    // --- UserDetails Implementation (Updated for Role) ---
    @Override 
    public Collection<? extends GrantedAuthority> getAuthorities() { 
        // Grants the user their single Role authority
        return List.of(new SimpleGrantedAuthority(role.getAuthority()));
    } 

    @Override 
    public String getUsername() { 
        return email; 
    } 

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}