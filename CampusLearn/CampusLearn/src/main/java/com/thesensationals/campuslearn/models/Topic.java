package com.thesensationals.campuslearn.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topic_id;

    private Long creator_id; // FK to User
    private Long module_id;  // FK to Module
    private String title;
    private String description;
    private Boolean is_anonymous = false;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created_at = LocalDateTime.now();

    // Getters
    public Long getTopic_id() {
        return topic_id;
    }

    public Long getCreator_id() {
        return creator_id;
    }

    public Long getModule_id() {
        return module_id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getIs_anonymous() {
        return is_anonymous;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    // Setters
    public void setTopic_id(Long topic_id) {
        this.topic_id = topic_id;
    }

    public void setCreator_id(Long creator_id) {
        this.creator_id = creator_id;
    }

    public void setModule_id(Long module_id) {
        this.module_id = module_id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setIs_anonymous(Boolean is_anonymous) {
        this.is_anonymous = is_anonymous;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
