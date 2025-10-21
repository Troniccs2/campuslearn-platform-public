package com.thesensationals.campuslearn.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/debug")
@CrossOrigin(origins = "http://localhost:5173")
public class DebugController {

    private static final Logger logger = LoggerFactory.getLogger(DebugController.class);

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        logger.info("Received /api/debug/ping");
        return ResponseEntity.ok("debug-pong");
    }
}
