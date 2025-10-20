package com.thesensationals.campuslearn.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.model.Conversation;
import com.thesensationals.campuslearn.model.Message;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.ConversationRepository;
import com.thesensationals.campuslearn.repository.MessageRepository;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;

    public MessageService(MessageRepository messageRepository, ConversationRepository conversationRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
    }

    public Message sendMessage(Conversation conversation, User sender, String content) {
        Message m = new Message();
        m.setConversation(conversation);
        m.setSender(sender);
        m.setContent(content);
        Message saved = messageRepository.save(m);
        conversation.getMessages().add(saved);
        conversationRepository.save(conversation);
        return saved;
    }

    public List<Message> getMessagesForConversation(Long conversationId) {
        return messageRepository.findByConversationIdOrderBySentAtAsc(conversationId);
    }
}
