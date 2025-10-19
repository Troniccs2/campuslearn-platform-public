package com.thesensationals.campuslearn.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order; 
import org.springframework.http.HttpMethod; 
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer; 
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity(debug = true) 
@Order(1) 
public class SecurityConfig {

    /**
     * CRITICAL FIX: Defines the PasswordEncoder bean.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Exposes the AuthenticationManager bean, required by AuthController for login.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    // CORS FIX: Defines a fully permissive CORS configuration for the frontend
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // IMPORTANT: Replace "http://localhost:5173" if your frontend URL changes
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); 
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); 
        
        return source;
    }
    
    /**
     * Defines the security filter chain and access rules.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // CORS FIX: Apply the custom CORS configuration source
            .cors(Customizer.withDefaults())
            // Disable CSRF for stateless API
            .csrf(AbstractHttpConfigurer::disable) // Use standard Spring Boot 3 syntax
            .authorizeHttpRequests(auth -> auth
                
                // Public Endpoints (No Authentication Required)
                .requestMatchers("/api/auth/**").permitAll() 
                
                // FIX: Allow public access to the forum read endpoints
                // Explicitly permit the categories endpoint first (clear intent)
                .requestMatchers(HttpMethod.GET, "/api/forums/categories").permitAll()
                // Permit any other forum GET endpoints (threads, thread view, etc.)
                .requestMatchers(HttpMethod.GET, "/api/forums/**").permitAll()
                
                // ------------------ TOPIC ENDPOINT SECURITY ------------------
                
                // CRITICAL FIX: Allow unauthenticated (public) access to read a single topic by its slug
                .requestMatchers(HttpMethod.GET, "/api/topics/*").permitAll() // Matches /api/topics/{slug}

                // 1. GET /api/topics (list): Accessible by all authenticated users
                .requestMatchers(HttpMethod.GET, "/api/topics").authenticated()
                
                // 2. POST /api/topics: Only accessible by TUTOR and ADMIN roles for creation
                .requestMatchers(HttpMethod.POST, "/api/topics").hasAnyRole("TUTOR", "ADMIN")
                
                // -----------------------------------------------------------------
                
                // Require authentication for all other requests
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); // Use Basic Auth for initial testing
            
        return http.build();
    }
}