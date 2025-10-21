package com.thesensationals.campuslearn.controller; 

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller to provide a simple, unauthenticated health check for cloud services (like Render).
 */
@RestController
public class HealthCheckController {

    @GetMapping("/api/status")
    public String checkStatus() {
        return "OK";
    }
}