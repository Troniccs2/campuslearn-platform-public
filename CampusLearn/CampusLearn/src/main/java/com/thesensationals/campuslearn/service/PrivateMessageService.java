package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.PrivateMessage;
import com.thesensationals.campuslearn.repository.PrivateMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PrivateMessageService {

    private PrivateMessageRepository privateMessageRepository;

    public PrivateMessage saveMessage(PrivateMessage message) {
        return null;
    }

    public Optional<PrivateMessage> findMessageById(Long id) {
        return Optional.empty();
    }

    public List<PrivateMessage> findMessagesBySenderId(String userId) {
        return null;
    }
}