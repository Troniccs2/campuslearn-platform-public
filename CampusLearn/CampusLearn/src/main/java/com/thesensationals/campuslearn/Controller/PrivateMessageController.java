package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.models.PrivateMessage;
import com.thesensationals.campuslearn.service.PrivateMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/messages")
public class PrivateMessageController {

    private PrivateMessageService messageService;

    public ResponseEntity<PrivateMessage> sendMessage(@RequestBody PrivateMessage message) {
        return null;
    }

    public ResponseEntity<PrivateMessage> getMessageById(@PathVariable Long id) {
        return null;
    }
}