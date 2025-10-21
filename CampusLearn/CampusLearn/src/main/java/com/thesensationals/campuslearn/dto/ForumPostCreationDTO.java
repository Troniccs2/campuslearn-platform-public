package com.thesensationals.campuslearn.dto;

import jakarta.validation.constraints.NotBlank;

public class ForumPostCreationDTO {

    @NotBlank(message = "Post content is required")
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