// Remove all Lombok annotations like @Data, @Getter, @Setter, @NoArgsConstructor, etc.
// import lombok.Data; // REMOVE THIS LINE

package com.thesensationals.campuslearn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Your existing class structure
@Entity
@Table(name = "learning_material")
public class LearningMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long topicId; 
    private String fileName;
    private String fileUrl;
    private String mimeType;
    private Long uploadedByUserId;
    private String status;

    // 1. ADD A DEFAULT CONSTRUCTOR (required by JPA)
    public LearningMaterial() {
    }

    // 2. ADD SETTERS (to fix the 'cannot find symbol' errors)

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
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

    public void setUploadedByUserId(Long uploadedByUserId) {
        this.uploadedByUserId = uploadedByUserId;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    // 3. ADD GETTERS (you will likely need these elsewhere)
    
    public Long getId() {
        return id;
    }

    public Long getTopicId() {
        return topicId;
    }
    
    // ... add remaining getters for other fields if needed
}