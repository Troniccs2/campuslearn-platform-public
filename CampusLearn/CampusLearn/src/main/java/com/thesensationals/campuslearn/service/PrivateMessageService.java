package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.PrivateMessage;
import com.thesensationals.campuslearn.repository.PrivateMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PrivateMessageService {

    private final PrivateMessageRepository privateMessageRepository;


    public PrivateMessageService(PrivateMessageRepository privateMessageRepository) {
        this.privateMessageRepository = privateMessageRepository;
    }

    public PrivateMessage sendMessage(PrivateMessage message) {
        return privateMessageRepository.save(message);
    }

    public Optional<PrivateMessage> getMessageById(Long id) {
        return privateMessageRepository.findById(id);
    }

    // Example: find messages by student or tutor
    public List<PrivateMessage> findMessagesByStudentId(Long studentId) {
        // Implement custom query in repository if needed
        return null;
    }
}