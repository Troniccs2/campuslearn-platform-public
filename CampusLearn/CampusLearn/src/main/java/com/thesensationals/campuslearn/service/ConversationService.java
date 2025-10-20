package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.model.Conversation;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.ConversationRepository;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    public Conversation createConversation(List<User> participants) {
        // If a conversation between the same exact participants exists, return it
        List<Conversation> all = conversationRepository.findAll();
        for (Conversation c : all) {
            List<Long> ids = c.getParticipants().stream().map(User::getId).sorted().collect(Collectors.toList());
            List<Long> newIds = participants.stream().map(User::getId).sorted().collect(Collectors.toList());
            if (ids.equals(newIds)) return c;
        }

        Conversation conv = new Conversation();
        conv.setParticipants(participants);
        return conversationRepository.save(conv);
    }

    public Optional<Conversation> findById(Long id) {
        return conversationRepository.findById(id);
    }

    public List<Conversation> findForUser(Long userId) {
        return conversationRepository.findByParticipantId(userId);
    }
}
