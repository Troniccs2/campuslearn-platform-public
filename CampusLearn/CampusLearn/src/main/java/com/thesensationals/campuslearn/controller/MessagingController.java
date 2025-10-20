package com.thesensationals.campuslearn.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.model.Conversation;
import com.thesensationals.campuslearn.model.Message;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.UserRepository;
import com.thesensationals.campuslearn.service.ConversationService;
import com.thesensationals.campuslearn.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessagingController {

    private final UserRepository userRepository;
    private final ConversationService conversationService;
    private final MessageService messageService;

    public MessagingController(UserRepository userRepository, ConversationService conversationService, MessageService messageService) {
        this.userRepository = userRepository;
        this.conversationService = conversationService;
        this.messageService = messageService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("q") String q) {
        List<User> users = userRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(q, q, q);
        return ResponseEntity.ok(users.stream().map(u -> {
            // Avoid sending password/reset tokens in the response
            User safe = new User();
            safe.setId(u.getId());
            safe.setFirstName(u.getFirstName());
            safe.setLastName(u.getLastName());
            safe.setEmail(u.getEmail());
            safe.setRole(u.getRole());
            return safe;
        }).collect(Collectors.toList()));
    }

    @GetMapping("/tutors")
    public ResponseEntity<List<User>> listTutors() {
        List<User> tutors = userRepository.findAllByRole(com.thesensationals.campuslearn.model.Role.TUTOR);
        return ResponseEntity.ok(tutors.stream().map(u -> {
            User safe = new User();
            safe.setId(u.getId());
            safe.setFirstName(u.getFirstName());
            safe.setLastName(u.getLastName());
            safe.setEmail(u.getEmail());
            safe.setRole(u.getRole());
            return safe;
        }).collect(Collectors.toList()));
    }

    static class CreateConvRequest { public List<Long> participantIds; }

    @PostMapping("/create")
    public ResponseEntity<Conversation> createConversation(@RequestBody CreateConvRequest req, Principal principal) {
        // find users
        List<User> parts = new ArrayList<>();
        if (req.participantIds != null) {
            for (Long id : req.participantIds) {
                userRepository.findById(id).ifPresent(parts::add);
            }
        }
        // ensure current user included
        if (principal != null) {
            Optional<User> me = userRepository.findByEmail(principal.getName());
            me.ifPresent(u -> { if (!parts.stream().anyMatch(p -> p.getId().equals(u.getId()))) parts.add(u); });
        }

        Conversation conv = conversationService.createConversation(parts);
        return ResponseEntity.ok(conv);
    }

    @GetMapping("/conversations/me")
    public ResponseEntity<List<Conversation>> myConversations(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        Optional<User> me = userRepository.findByEmail(principal.getName());
        if (me.isEmpty()) return ResponseEntity.status(401).build();
        List<Conversation> convs = conversationService.findForUser(me.get().getId());
        return ResponseEntity.ok(convs);
    }

    @GetMapping("/{conversationId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long conversationId, Principal principal) {
        // Basic access check - ensure user is participant
        Optional<Conversation> convOpt = conversationService.findById(conversationId);
        if (convOpt.isEmpty()) return ResponseEntity.notFound().build();
        Conversation conv = convOpt.get();
        if (principal != null) {
            Optional<User> me = userRepository.findByEmail(principal.getName());
            if (me.isEmpty()) return ResponseEntity.status(401).build();
            boolean participant = conv.getParticipants().stream().anyMatch(p -> p.getId().equals(me.get().getId()));
            if (!participant) return ResponseEntity.status(403).build();
        }

        List<Message> msgs = messageService.getMessagesForConversation(conversationId);
        return ResponseEntity.ok(msgs);
    }

    static class SendMessageRequest { public Long conversationId; public String content; }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest req, Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        Optional<User> me = userRepository.findByEmail(principal.getName());
        if (me.isEmpty()) return ResponseEntity.status(401).build();
        Optional<Conversation> convOpt = conversationService.findById(req.conversationId);
        if (convOpt.isEmpty()) return ResponseEntity.notFound().build();
        Conversation conv = convOpt.get();
        boolean participant = conv.getParticipants().stream().anyMatch(p -> p.getId().equals(me.get().getId()));
        if (!participant) return ResponseEntity.status(403).build();

        Message m = messageService.sendMessage(conv, me.get(), req.content);
        return ResponseEntity.ok(m);
    }
}
