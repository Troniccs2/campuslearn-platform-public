package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.Topic;
import org.springframework.stereotype.Service;

@Service
public class ChatbotAssistant {
    private String knowledgeBase;

    public ChatbotAssistant() {
    }

    public String answerQuestion(String query) {
        return null;
    }

    public void escalateToTutor(Topic topic, String reason) {
    }

    public void logEscalation(String topicId, String details) {
    }

    public String getKnowledgeBase() {
        return null;
    }

    public void setKnowledgeBase(String knowledgeBase) {
    }
}