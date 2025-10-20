package com.thesensationals.campuslearn;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync; // ⬅️ CORRECT IMPORT

import com.thesensationals.campuslearn.service.AuthenticationService;

@SpringBootApplication
@EntityScan(basePackages = "com.thesensationals.campuslearn.model")
@EnableAsync // ⬅️ CORRECT ANNOTATION: Enables background thread processing for file uploads
public class CampuslearnApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampuslearnApplication.class, args);
    }
    
    /**
     * 🚀 CONFIGURATION: Create the initial Admin user on startup.
     * This runs immediately after the application context is loaded.
     */
    @Bean
    public CommandLineRunner adminInitializer(AuthenticationService authService) {
        return args -> {
            
            // 💡 WARNING: CHANGE THESE CREDENTIALS IMMEDIATELY AFTER FIRST RUN!
            final String ADMIN_EMAIL = "admin@campuslearn.com";
            final String ADMIN_PASSWORD = "AdminPassword123"; 
            final String ADMIN_FIRST_NAME = "System";
            final String ADMIN_LAST_NAME = "Administrator";
            
            authService.createInitialAdminUser(
                ADMIN_EMAIL, 
                ADMIN_PASSWORD,
                ADMIN_FIRST_NAME,
                ADMIN_LAST_NAME
            );
        };
    }
}