package com.thesensationals.campuslearn.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_materials")
public class LearningMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long material_id;

    private Long uploader_id; // FK to User
    private Long topic_id; // FK to Topic (can be null if general)
    private Long module_id; // FK to Module
    private String title;
    private String type; // e.g., 'pdf', 'video'
    private String file_path;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created_at = LocalDateTime.now();

    // Getters
    public Long getMaterial_id() {
        return material_id;
    }

    public Long getUploader_id() {
        return uploader_id;
    }

    public Long getTopic_id() {
        return topic_id;
    }

    public Long getModule_id() {
        return module_id;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public String getFile_path() {
        return file_path;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    // Setters
    public void setMaterial_id(Long material_id) {
        this.material_id = material_id;
    }

    public void setUploader_id(Long uploader_id) {
        this.uploader_id = uploader_id;
    }

    public void setTopic_id(Long topic_id) {
        this.topic_id = topic_id;
    }

    public void setModule_id(Long module_id) {
        this.module_id = module_id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setFile_path(String file_path) {
        this.file_path = file_path;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
