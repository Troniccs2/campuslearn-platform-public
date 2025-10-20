package com.thesensationals.campuslearn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;       // NEW: For Many-to-One relationship
import jakarta.persistence.JoinColumn;      // NEW: For defining the foreign key column
import jakarta.persistence.FetchType;     // NEW: For defining the fetching strategy

@Entity
@Table(name = "learning_material")
public class LearningMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // 💡 FIX 1: Replace topicId with the Topic entity object
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false) 
    private Topic topic; 
    
    private String fileName;
    private String fileUrl;
    private String mimeType;
    
    // 💡 FIX 2: Replace uploadedByUserId with the User entity object
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by_user_id", nullable = false)
    private User uploadedBy;
    
    private String status;

    // 1. DEFAULT CONSTRUCTOR (required by JPA)
    public LearningMaterial() {
    }

    // --- GETTERS ---
    public Long getId() {
        return id;
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

    // --- SETTERS ---
    // Note: We don't set the ID
    
    // This is the method that fixes the "cannot find symbol: setTopic(Topic)" error
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

    // This is the method that fixes the "cannot find symbol: setUploadedBy(User)" error
    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}