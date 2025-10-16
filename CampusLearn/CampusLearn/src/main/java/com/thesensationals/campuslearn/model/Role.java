package com.thesensationals.campuslearn.model;

import org.springframework.security.core.GrantedAuthority;

/**
 * Defines the possible roles for a user. 
 * Implements GrantedAuthority for Spring Security compatibility.
 */
public enum Role implements GrantedAuthority {
    STUDENT,
    TUTOR,
    ADMIN;
    
    // Spring Security expects roles to be prefixed with "ROLE_"
    @Override
    public String getAuthority() {
        return "ROLE_" + this.name();
    }
}