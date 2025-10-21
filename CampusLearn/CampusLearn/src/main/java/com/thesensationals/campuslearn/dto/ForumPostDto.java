package com.thesensationals.campuslearn.dto;

import com.thesensationals.campuslearn.model.ForumPost;
import java.time.Instant;

public class ForumPostDto { // Class name: ForumPostDto

    private Long id; 
    private String content;
    private String authorName; 
    private Instant postedAt; 

    // Constructor relies on the guaranteed public getters in ForumPost
    public ForumPostDto(ForumPost post) {
        this.id = post.getId(); 
        this.content = post.getContent();
        this.authorName = post.getAuthorName();
        this.postedAt = post.getPostedAt(); 
    }
    
    public ForumPostDto() { }

    // --- Getters and Setters ---
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public Instant getPostedAt() { return postedAt; }
    public void setPostedAt(Instant postedAt) { this.postedAt = postedAt; }
}