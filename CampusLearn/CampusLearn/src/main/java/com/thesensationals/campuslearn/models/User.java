package com.thesensationals.campuslearn.models;

import javax.persistence.*;
import java.time.LocalDateTime;

// Base class using JOINED inheritance strategy
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password_hash;

    private String first_name;
    private String last_name;
    private String role; // 'student', 'tutor', 'admin'

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created_at = LocalDateTime.now();

    // Getters
    public Long getUser_id() {
        return user_id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    // Setters
    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
