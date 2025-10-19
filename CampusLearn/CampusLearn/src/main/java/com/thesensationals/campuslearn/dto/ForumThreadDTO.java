package com.thesensationals.campuslearn.dto;

import com.thesensationals.campuslearn.model.ForumThread;

public class ForumThreadDTO {
    
    private Long id;
    private String title;
    private String topicName; // Slug
    private String content; 
    private String creator; 
    private Long lastUpdated;
    private String categorySlug; 
    private String categoryName;

    public ForumThreadDTO() {}

    // Constructor to map from the entity 
    public ForumThreadDTO(ForumThread thread) {
        this.id = thread.getId();
        this.title = thread.getTitle();
        this.topicName = thread.getTopicName();
        this.content = thread.getContent();
        this.creator = thread.getCreator();
        this.lastUpdated = thread.getLastUpdated().toEpochMilli(); 
        
        this.categorySlug = thread.getForumCategory().getSlug();
        this.categoryName = thread.getForumCategory().getName();
    }
    
    // Getters and Setters (omitted for brevity, but they must be present)
    // ... all getters and setters for the fields above

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Long getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getCategorySlug() {
        return categorySlug;
    }

    public void setCategorySlug(String categorySlug) {
        this.categorySlug = categorySlug;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}