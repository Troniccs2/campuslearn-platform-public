package com.thesensationals.campuslearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CampusLearnApplication {

    public static void main(String[] args) {
        // This line starts the entire Spring Boot container, initializes the database,
        // and loads all controllers, services, and repositories.
        SpringApplication.run(CampusLearnApplication.class, args);
    }

}
