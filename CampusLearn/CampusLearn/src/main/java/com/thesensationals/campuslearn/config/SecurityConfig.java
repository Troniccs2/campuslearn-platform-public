package com.thesensationals.campuslearn.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order; // <-- NEW IMPORT
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer; 
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain; 

@Configuration
@EnableWebSecurity(debug = true) 
@Order(1) // <-- CRITICAL: Forces this config to load first, fixing the 401 issue
public class SecurityConfig {

    /**
     * Exposes the AuthenticationManager bean, required by AuthController for login.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    /**
     * Defines the security filter chain and access rules.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless API
            .authorizeHttpRequests(auth -> auth
                // Allow public access to all authentication endpoints (e.g., /api/auth/register, /api/auth/login)
                .requestMatchers("/api/auth/**").permitAll() 
                // Require authentication for all other requests
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); // Use Basic Auth for initial testing
            
        return http.build();
    }
}