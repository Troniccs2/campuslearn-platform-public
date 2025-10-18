package com.thesensationals.campuslearn.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ForumCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // e.g., "Workshops"
    private String slug;        // e.g., "workshops"
    private String lastAuthor;
    private Instant lastUpdated; // correctly handle date/time data

    // No-arg constructor
    public ForumCategory() {}

    // All-args constructor
    public ForumCategory(Long id, String name, String slug, String lastAuthor, Instant lastUpdated) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.lastAuthor = lastAuthor;
        this.lastUpdated = lastUpdated;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getLastAuthor() {
        return lastAuthor;
    }

    public void setLastAuthor(String lastAuthor) {
        this.lastAuthor = lastAuthor;
    }

    public Instant getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}