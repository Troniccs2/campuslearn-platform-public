package com.thesensationals.campuslearn.dto;

import com.thesensationals.campuslearn.model.ForumThread;
// NOTE: Remove the import for @JsonProperty if it was added

public class ForumThreadDTO {

    private Long id; 
    private String title;
    private String content;
    private String categorySlug;
    
    // ✅ CRITICAL FIX: The name of the field is now 'threadSlug' 
    // to match the frontend, even though the database uses 'topicName'.
    private String threadSlug; 

    // 1. Default Constructor
    public ForumThreadDTO() {
    }

    // 2. Constructor for converting the JPA Entity (ForumThread) to a DTO
    public ForumThreadDTO(ForumThread thread) {
        this.id = thread.getId(); 
        this.title = thread.getTitle();
        this.content = thread.getContent();
        
        // MAPPING: Map the entity's topicName to the DTO's threadSlug
        this.threadSlug = thread.getTopicName(); // <--- Mapped from JPA Entity
        
        // Placeholder for category mapping
        // if (thread.getForumCategory() != null) {
        //      this.categorySlug = thread.getForumCategory().getSlug(); 
        // }
    }

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCategorySlug() { return categorySlug; }
    public void setCategorySlug(String categorySlug) { this.categorySlug = categorySlug; }

    // ✅ NEW GETTER/SETTER: Now correctly named to expose 'threadSlug' in JSON
    public String getThreadSlug() { return threadSlug; }
    public void setThreadSlug(String threadSlug) { this.threadSlug = threadSlug; }
    
    // NOTE: Ensure you delete any old getTopicName/setTopicName methods 
    // that might conflict with the new name.
}