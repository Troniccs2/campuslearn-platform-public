package com.thesensationals.campuslearn.dto;

import com.thesensationals.campuslearn.model.ForumThread;
// NOTE: Remove the import for @JsonProperty if it was added

public class ForumThreadDTO {

    private Long id;
    private String title;
    private String content;
    private String categorySlug;
    private String threadSlug;
    private String authorName;
    private String lastUpdated;
    private long replyCount;

    // 1. Default Constructor
    public ForumThreadDTO() {
    }

    // 2. Constructor for converting the JPA Entity (ForumThread) to a DTO
    public ForumThreadDTO(ForumThread thread) {
        this(thread, 0L);
    }

    public ForumThreadDTO(ForumThread thread, long replyCount) {
        this.id = thread.getId();
        this.title = thread.getTitle();
        this.content = thread.getContent();
        
        this.threadSlug = thread.getTopicName();
        this.categorySlug = thread.getForumCategory() != null ? thread.getForumCategory().getSlug() : null;
        this.authorName = thread.getCreator();
        this.lastUpdated = thread.getLastUpdated() != null ? thread.getLastUpdated().toString() : null;
        this.replyCount = replyCount;
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

    public String getThreadSlug() { return threadSlug; }
    public void setThreadSlug(String threadSlug) { this.threadSlug = threadSlug; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }
    public long getReplyCount() { return replyCount; }
    public void setReplyCount(long replyCount) { this.replyCount = replyCount; }
    
    // NOTE: Ensure you delete any old getTopicName/setTopicName methods 
    // that might conflict with the new name.
}