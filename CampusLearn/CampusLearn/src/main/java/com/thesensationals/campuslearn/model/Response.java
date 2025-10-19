package com.thesensationals.campuslearn.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "response") // Assuming your PostgreSQL table is named 'response'
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "forum_thread_id", nullable = false)
    private ForumThread forumThread;

    // Assuming a User model exists and is mapped for the author
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, updatable = false)
    private Instant createdDate = Instant.now();

    // --- Constructors ---
    public Response() {
        this.createdDate = Instant.now();
    }

    // --- Getters and Setters (REQUIRED to fix your current compilation errors) ---
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Fixes 'cannot find symbol getCreatedDate()'
    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public ForumThread getForumThread() {
        return forumThread;
    }

    public void setForumThread(ForumThread forumThread) {
        this.forumThread = forumThread;
    }

    // Fixes 'cannot find symbol getUser()'
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}