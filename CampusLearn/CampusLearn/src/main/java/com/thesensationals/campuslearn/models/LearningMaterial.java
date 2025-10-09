package com.thesensationals.campuslearn.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_materials")
public class LearningMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    private Long uploaderId; // FK to User
    private Long topicId; // FK to Topic (can be null if general)
    private Long moduleId; // FK to Module
    private String title;
    private String type; // e.g., 'pdf', 'video'
    private String filePath;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters
    public Long getMaterialId() {
        return materialId;
    }
    public Long getUploaderId() {
        return uploaderId;
    }
    public Long getTopicId() {
        return topicId;
    }
    public Long getModuleId() {
        return moduleId;
    }
    public String getTitle() {
        return title;
    }
    public String getType() {
        return type;
    }
    public String getFilePath() {
        return filePath;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Setters
    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }
    public void setUploaderId(Long uploaderId) {
        this.uploaderId = uploaderId;
    }
    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setType(String type) {
        this.type = type;
    }
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Constructors
    public LearningMaterial() {}

    public LearningMaterial(Long uploaderId, Long topicId, Long moduleId, String title, String type, String filePath) {
        this.uploaderId = uploaderId;
        this.topicId = topicId;
        this.moduleId = moduleId;
        this.title = title;
        this.type = type;
        this.filePath = filePath;
        this.createdAt = LocalDateTime.now();
    }

    // equals, hashCode, toString
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LearningMaterial that = (LearningMaterial) o;
        return materialId != null && materialId.equals(that.materialId);
    }

    @Override
    public int hashCode() {
        return materialId != null ? materialId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "LearningMaterial{" +
                "materialId=" + materialId +
                ", uploaderId=" + uploaderId +
                ", topicId=" + topicId +
                ", moduleId=" + moduleId +
                ", title='" + title + '\'' +
                ", type='" + type + '\'' +
                ", filePath='" + filePath + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
