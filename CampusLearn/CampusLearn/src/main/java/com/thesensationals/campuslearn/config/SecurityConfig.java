package com.thesensationals.campuslearn.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    // Minimal Security Configuration to allow public access to auth endpoints
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for API development
            .authorizeHttpRequests(auth -> auth
                // Allow public access to all authentication endpoints
                .requestMatchers("/api/auth/**").permitAll() 
                // Require authentication for all other requests
                .anyRequest().authenticated()
            );
        return http.build();
    }
}