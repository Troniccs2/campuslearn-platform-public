package com.thesensationals.campuslearn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne; 
import jakarta.persistence.JoinColumn; 
import jakarta.persistence.FetchType; 

import java.time.Instant; // 🛑 NEW: Import Instant for the creationDate field

@Entity
@Table(name = "learning_material")
public class LearningMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // 🛑 NEW FIELD: Added the mandatory title field
    private String title;
    
    private String fileName;
    private String fileUrl;
    private String mimeType;
    
    // 🛑 NEW FIELD: Added the mandatory creationDate field
    private Instant creationDate;
    
    private String status;
    
    // Relationship: Link to Topic
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false) 
    private Topic topic; 
    
    // Relationship: Link to User (Uploader)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by_user_id", nullable = false)
    private User uploadedBy;
    
    
    // 1. DEFAULT CONSTRUCTOR (required by JPA)
    public LearningMaterial() {
    }

    // ------------------------------------
    // --- GETTERS ---
    // ------------------------------------
    public Long getId() {
        return id;
    }

    // 🛑 NEW GETTER
    public String getTitle() {
        return title;
    }

    public Topic getTopic() {
        return topic;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public String getMimeType() {
        return mimeType;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public String getStatus() {
        return status;
    }
    
    // 🛑 NEW GETTER
    public Instant getCreationDate() {
        return creationDate;
    }

    // ------------------------------------
    // --- SETTERS ---
    // ------------------------------------
    
    // 🛑 NEW SETTER
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    // 🛑 NEW SETTER
    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }
}