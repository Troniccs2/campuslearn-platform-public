package com.thesensationals.campuslearn.dto;

public class ForumPostDto {

    private Long threadId;
    private String content;
    private String authorName; // Will be replaced by authenticated user later

    // Constructor (optional, but good practice)
    public ForumPostDto() {}

    // Getters and Setters (REQUIRED for Spring to map JSON to this object)
    
    public Long getThreadId() {
        return threadId;
    }

    public void setThreadId(Long threadId) {
        this.threadId = threadId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}