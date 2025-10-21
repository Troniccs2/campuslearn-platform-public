package com.thesensationals.campuslearn.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.dto.AdminAccountDto;
import com.thesensationals.campuslearn.service.AdminAccountService;

@RestController
@RequestMapping("/api/internal/admin/accounts")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminAccountController {

    private static final Logger logger = LoggerFactory.getLogger(AdminAccountController.class);

    private final AdminAccountService adminAccountService;

    public AdminAccountController(AdminAccountService adminAccountService) {
        this.adminAccountService = adminAccountService;
    }

    @GetMapping
    public ResponseEntity<List<AdminAccountDto>> listAll() {
        List<AdminAccountDto> users = adminAccountService.listAllUsers();
        logger.info("GET /api/internal/admin/accounts returned {} users", users.size());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        logger.debug("GET /api/internal/admin/accounts/ping");
        return ResponseEntity.ok("pong");
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminAccountDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(adminAccountService.getUserById(id));
    }

    @GetMapping("/by-id/{id}")
    public ResponseEntity<AdminAccountDto> getByIdAlternate(@PathVariable Long id) {
        logger.info("GET /api/internal/admin/accounts/by-id/{}", id);
        return ResponseEntity.ok(adminAccountService.getUserById(id));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<AdminAccountDto> approve(@PathVariable Long id) {
        return ResponseEntity.ok(adminAccountService.approveUser(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adminAccountService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
