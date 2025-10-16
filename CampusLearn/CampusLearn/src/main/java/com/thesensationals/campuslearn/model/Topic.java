package com.thesensationals.campuslearn.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String topicName; // e.g., "SEN381"

    @Column(nullable = false)
    private String title; // e.g., "Software Engineering"

    // Many-to-One relationship with the User who created the topic (the author)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    // Default constructor for JPA
    public Topic() {
        this.lastUpdated = LocalDateTime.now();
    }

    // Constructor for creation
    public Topic(String topicName, String title, User author) {
        this.topicName = topicName;
        this.title = title;
        this.author = author;
        this.lastUpdated = LocalDateTime.now();
    }

    // --- Getters and Setters (Omitted for brevity, but required) ---
    // You should use Lombok if possible, or generate these in your IDE (IntelliJ/VS Code).
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }
    
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}