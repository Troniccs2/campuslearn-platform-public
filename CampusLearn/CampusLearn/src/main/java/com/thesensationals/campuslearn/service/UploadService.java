package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.LearningMaterial;
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class UploadService {

    private final LearningMaterialRepository materialRepository;
    private final String UPLOAD_DIR = "uploads/learning_materials/";

    public UploadService(LearningMaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
        // Ensure the upload directory exists
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        } catch (Exception e) {
            System.err.println("Could not create upload directory: " + e.getMessage());
        }
    }

    // CRITICAL: This method runs asynchronously in a background thread
    @Async
    public void processMaterialUpload(Long topicId, MultipartFile[] files, Long userId) {
        System.out.println("Starting asynchronous processing for Topic ID: " + topicId);
        
        for (MultipartFile file : files) {
            if (file.isEmpty() || file.getOriginalFilename() == null) continue;
            
            try {
                // 1. Generate a unique name and path
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("\\s+", "_");
                Path filePath = Paths.get(UPLOAD_DIR, fileName);

                // 2. Save file to disk
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                
                // 3. Create database entry
                LearningMaterial material = new LearningMaterial();
                material.setTopicId(topicId); 
                material.setFileName(file.getOriginalFilename());
                
                // Fix: Save the public-facing URL path
                material.setFileUrl("/files/" + fileName); 
                
                material.setMimeType(file.getContentType());
                material.setUploadedByUserId(userId); 
                material.setStatus("READY"); 
                
                materialRepository.save(material);
                
            } catch (Exception e) {
                System.err.println("Failed to process and save file: " + file.getOriginalFilename() + ". Error: " + e.getMessage());
            }
        }
        System.out.println("Asynchronous processing complete for Topic ID: " + topicId);
    }
}