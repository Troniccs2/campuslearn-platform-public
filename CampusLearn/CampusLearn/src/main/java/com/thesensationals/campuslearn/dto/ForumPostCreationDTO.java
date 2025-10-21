package com.thesensationals.campuslearn.dto;

// Note: No JPA entity import needed for a simple input DTO

public class ForumPostCreationDTO {

    private String content;

    // Default Constructor (required by Spring/Jackson)
    public ForumPostCreationDTO() {
    }

    // Constructor
    public ForumPostCreationDTO(String content) {
        this.content = content;
    }

    // Getters and Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}