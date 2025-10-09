package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.models.PrivateMessage;
import com.thesensationals.campuslearn.service.PrivateMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class PrivateMessageController {

    private final PrivateMessageService messageService;


    public PrivateMessageController(PrivateMessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<PrivateMessage> sendMessage(@RequestBody PrivateMessage message) {
        PrivateMessage saved = messageService.sendMessage(message);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrivateMessage> getMessageById(@PathVariable Long id) {
        Optional<PrivateMessage> msg = messageService.getMessageById(id);
        return msg.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}