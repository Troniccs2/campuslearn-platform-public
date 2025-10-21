package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.UserEntity;
import com.thesensationals.campuslearn.service.AdminAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
// Moved to a less-likely static path to avoid resource handler collisions during local dev
@RequestMapping("/api/internal/admin/accounts")
// Dev: allow requests from the front-end dev server. Remove or restrict in production.
@CrossOrigin(origins = "http://localhost:5173")
public class AdminAccountController {

    private static final Logger logger = LoggerFactory.getLogger(AdminAccountController.class);

    private final AdminAccountService adminAccountService;

    public AdminAccountController(AdminAccountService adminAccountService) {
        this.adminAccountService = adminAccountService;
    }

    @GetMapping
    public ResponseEntity<List<UserEntity>> listAll() {
        List<UserEntity> users = adminAccountService.listAllUsers();
        logger.info("GET /api/admin/accounts called — returning {} users", users == null ? 0 : users.size());
        return ResponseEntity.ok(users);
    }

    // Simple ping to verify this controller is registered and reachable
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        logger.info("PING /api/internal/admin/accounts/ping");
        return ResponseEntity.ok("pong");
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getById(@PathVariable Long id) {
        UserEntity u = adminAccountService.getUserById(id);
        return ResponseEntity.ok(u);
    }

    // Alternate mapping in case some resource handlers intercept the plain numeric path.
    // Call: GET /api/admin/accounts/by-id/{id}
    @GetMapping("/by-id/{id}")
    public ResponseEntity<UserEntity> getByIdAlternate(@PathVariable Long id) {
        logger.info("GET /api/admin/accounts/by-id/{} called", id);
        UserEntity u = adminAccountService.getUserById(id);
        return ResponseEntity.ok(u);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<UserEntity> approve(@PathVariable Long id) {
        return ResponseEntity.ok(adminAccountService.approveUser(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adminAccountService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
