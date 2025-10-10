package com.thesensationals.campuslearn.models;

public class ChatbotAssistant {
    private String knowledgeBase;

    public ChatbotAssistant(String knowledgeBase) {
        this.knowledgeBase = knowledgeBase;
    }

    public String answerQuestion(String query) {
        return "Answer for: " + query;
    }

    public void escalateToTutor(String topic, String reason) {
    }

    public void logEscalation(String topicId, String details) {
    }

    public String getKnowledgeBase() {
        return knowledgeBase;
    }

    public void setKnowledgeBase(String knowledgeBase) {
        this.knowledgeBase = knowledgeBase;
    }
}