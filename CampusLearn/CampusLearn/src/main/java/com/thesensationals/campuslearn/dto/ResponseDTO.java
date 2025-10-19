package com.thesensationals.campuslearn.dto;

import com.thesensationals.campuslearn.model.Response;
import java.time.Instant;

// This class uses standard Java methods (no Lombok) to avoid your environment issue.
public class ResponseDTO {
    
    private Long id;
    private String content;
    private Instant createdDate;
    private String authorUsername; 
    private Long topicId; 

    // Constructors
    public ResponseDTO() { }
    
    public ResponseDTO(Long id, String content, Instant createdDate, String authorUsername, Long topicId) {
        this.id = id;
        this.content = content;
        this.createdDate = createdDate;
        this.authorUsername = authorUsername;
        this.topicId = topicId;
    }

    // Static Factory Method to convert a Response JPA Entity to this DTO
    public static ResponseDTO fromEntity(Response entity) {
        // Safe check for null relationships (assuming 'User' and 'ForumThread' models exist)
        String authorName = (entity.getUser() != null) ? entity.getUser().getUsername() : "Unknown User";
        Long parentTopicId = (entity.getForumThread() != null) ? entity.getForumThread().getId() : null;
        
        return new ResponseDTO(
            entity.getId(),
            entity.getContent(),
            entity.getCreatedDate(),
            authorName,
            parentTopicId
        );
    }
    
    // Getters and Setters (Boilerplate)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public Instant getCreatedDate() { return createdDate; }
    public void setCreatedDate(Instant createdDate) { this.createdDate = createdDate; }
    
    public String getAuthorUsername() { return authorUsername; }
    public void setAuthorUsername(String authorUsername) { this.authorUsername = authorUsername; }
    
    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }
}