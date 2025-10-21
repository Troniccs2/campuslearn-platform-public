package com.thesensationals.campuslearn.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
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
// REQUIRED IMPORT
import org.springframework.security.config.http.SessionCreationPolicy; 
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

    // Inject the public frontend URL from the environment (set during cloud deployment)
    @Value("${FRONTEND_URL:http://localhost:5173}")
    private String frontendUrl;

    /**
     * Defines the PasswordEncoder bean.
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
    
    /**
     * Defines a fully permissive CORS configuration.
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // --- CRITICAL FIX: Use the injected frontendUrl to allow API calls from the frontend ---
        configuration.setAllowedOrigins(List.of(frontendUrl));
        // ----------------------------------------------------
        
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
            // Apply the custom CORS configuration source
            .cors(Customizer.withDefaults())
            // Disable CSRF for stateless API
            .csrf(AbstractHttpConfigurer::disable) 
            
            // *** CRITICAL ADDITION: Enforce stateless session policy ***
            // This is mandatory when not using JWT or cookies to ensure Basic Auth works on every request.
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            .authorizeHttpRequests(auth -> auth
                
                .requestMatchers("/").permitAll() 
                
                // Allow all OPTIONS requests (CORS Preflight)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                
                // Public Endpoints
                .requestMatchers("/api/status").permitAll()
                .requestMatchers("/api/auth/**").permitAll() 
                
                // Public GET endpoints
                .requestMatchers(HttpMethod.GET, "/api/files/download/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/forums/categories").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/forums/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/topics/*").permitAll()
                
                // DEV/ADMIN endpoints
                .requestMatchers("/api/admin/**").permitAll()
                .requestMatchers("/api/internal/admin/**").permitAll()
                .requestMatchers("/api/debug/**").permitAll()

                // Protected Endpoint 1: Requires any authenticated user
                .requestMatchers(HttpMethod.GET, "/api/topics").authenticated()
                
                // Protected Endpoint 2: Requires authenticated user with specific role
                .requestMatchers(HttpMethod.POST, "/api/topics").hasAnyRole("TUTOR", "ADMIN")
                
                // Require authentication for all other requests
                .anyRequest().authenticated()
            )
            // Enables the Basic Auth header processing
            .httpBasic(Customizer.withDefaults()); 
            
        return http.build();
    }
}
