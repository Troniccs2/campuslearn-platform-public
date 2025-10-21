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
     * Defines the PasswordEncoder bean.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // We are using BCrypt, which is a modern, strong hashing function.
        return new BCryptPasswordEncoder();
    }

    /**
     * Exposes the AuthenticationManager bean, required by AuthController for login.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    /**
     * Defines a fully permissive CORS configuration for the frontend development server.
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // IMPORTANT: Replace "http://localhost:5173" if your frontend URL changes
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); 
        
        // Allow all standard methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); 
        // Allow necessary headers for authentication and content type
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Cache-Control"));
        // Required for cookies/sessions/Basic Auth with CORS
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
            // Apply the custom CORS configuration source
            .cors(Customizer.withDefaults())
            // Disable CSRF for stateless API (as you are not managing session tokens/cookies for security)
            .csrf(AbstractHttpConfigurer::disable) 
            
            .authorizeHttpRequests(auth -> auth
                
                // CRITICAL FIX: Allow all OPTIONS requests (CORS Preflight) to go through
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // Public Endpoints (Authentication/Registration/Password Reset)
                .requestMatchers("/api/auth/**").permitAll() 
                
                // ------------------ FILE ENDPOINT SECURITY (FIXED) ------------------
                // 🛑 CHANGED to .permitAll() to prevent the login prompt when clicking the direct file link.
                .requestMatchers(HttpMethod.GET, "/api/files/download/**").permitAll()
                
                // ------------------ FORUM ENDPOINT SECURITY ------------------
                // Allow public access to all forum read endpoints
                .requestMatchers(HttpMethod.GET, "/api/forums/categories").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/forums/**").permitAll()
                
                // ------------------ TOPIC ENDPOINT SECURITY ------------------
                
                // CRITICAL FIX: Allow unauthenticated (public) access to read a single topic by its slug
                .requestMatchers(HttpMethod.GET, "/api/topics/*").permitAll() // Matches /api/topics/{slug}
                
                // DEV NOTE: Allow admin and debug endpoints for local dev (so the front-end dev server can fetch data)
                // IMPORTANT: Remove or restrict these in production environments.
                // Permit any method to /api/admin/** and /api/internal/admin/** during local development to speed testing.
                // Also permit the debug ping endpoint.
                .requestMatchers("/api/admin/**").permitAll()
                .requestMatchers("/api/internal/admin/**").permitAll()
                .requestMatchers("/api/debug/**").permitAll()

                // 1. GET /api/topics (list): Accessible by all authenticated users
                .requestMatchers(HttpMethod.GET, "/api/topics").authenticated()
                
                // 2. POST /api/topics: Only accessible by TUTOR and ADMIN roles for creation
                .requestMatchers(HttpMethod.POST, "/api/topics").hasAnyRole("TUTOR", "ADMIN")
                
                // ------------------ GENERAL/FALLBACK SECURITY ------------------
                // Require authentication for all other requests that haven't been explicitly permitted
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); // Use Basic Auth for initial testing
            
        return http.build();
    }
}