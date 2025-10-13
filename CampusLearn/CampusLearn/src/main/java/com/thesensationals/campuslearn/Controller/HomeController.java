package com.thesensationals.campuslearn.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {

    @GetMapping("/health")
    public String healthCheck() {
        return "CampusLearn API is running!";
    }

    @GetMapping("/welcome")
    public WelcomeResponse getWelcomeMessage() {
        return new WelcomeResponse(
            "Welcome to CampusLearn",
            "Your gateway to collaborative learning and academic excellence"
        );
    }

    static class WelcomeResponse {
        public String title;
        public String subtitle;

        public WelcomeResponse(String title, String subtitle) {
            this.title = title;
            this.subtitle = subtitle;
        }
    }
}