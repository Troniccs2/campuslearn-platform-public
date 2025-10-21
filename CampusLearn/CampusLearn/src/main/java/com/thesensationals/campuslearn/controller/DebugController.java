package com.thesensationals.campuslearn.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/debug")
@CrossOrigin(origins = "http://localhost:5173")
public class DebugController {

    @GetMapping("/ping")
    public ResponseEntity<Map<String, Object>> ping() {
        Map<String, Object> payload = new HashMap<>();
        payload.put("status", "ok");
        payload.put("timestamp", Instant.now().toString());
        return ResponseEntity.ok(payload);
    }
}
