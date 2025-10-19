package com.thesensationals.campuslearn.dto;

import java.util.List;

/**
 * DTO to return a single topic's full detail, including responses.
 */
public class TopicDetailDTO {
    
    // The main thread/topic (using a safe DTO)
    private ForumThreadDTO topic; 
    
    // A list of responses (using a safe DTO for each response)
    private List<ResponseDTO> responses;

    // Standard constructor
    public TopicDetailDTO(ForumThreadDTO topic, List<ResponseDTO> responses) {
        this.topic = topic;
        this.responses = responses;
    }
    
    // --- GETTERS (REQUIRED FOR JSON SERIALIZATION) ---
    
    public ForumThreadDTO getTopic() {
        return topic;
    }

    public List<ResponseDTO> getResponses() {
        return responses;
    }
    
    // --- SETTERS (Optional, removed for simplicity) ---
}