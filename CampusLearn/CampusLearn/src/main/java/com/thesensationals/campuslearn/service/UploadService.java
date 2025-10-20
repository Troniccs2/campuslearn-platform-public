package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.LearningMaterial;
import com.thesensationals.campuslearn.model.Topic; // ADDED: Import Topic model
import com.thesensationals.campuslearn.model.User; // ADDED: Import User model
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import com.thesensationals.campuslearn.repository.TopicRepository; // ADDED: Import TopicRepository
import com.thesensationals.campuslearn.repository.UserRepository; // ADDED: Import UserRepository
import org.springframework.beans.factory.annotation.Value; // ADDED: Import Value
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // ADDED: Import Transactional
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Service
public class UploadService {

    private final LearningMaterialRepository materialRepository;
    private final TopicRepository topicRepository; // NEW
    private final UserRepository userRepository;   // NEW

    // 💡 IMPROVEMENT: Use @Value to define the directory
    private final String UPLOAD_DIR; 

    public UploadService(
            LearningMaterialRepository materialRepository,
            TopicRepository topicRepository,
            UserRepository userRepository,
            @Value("${file.upload-dir:uploads/learning_materials/}") String uploadDir // Set default value
    ) {
        this.materialRepository = materialRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.UPLOAD_DIR = uploadDir;
        
        // Ensure the upload directory exists
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
        } catch (Exception e) {
            // CRITICAL ERROR: The application cannot save files. Stop startup or log severely.
            System.err.println("❌ CRITICAL: Could not create upload directory: " + UPLOAD_DIR + ". Error: " + e.getMessage());
            // It's often better to throw a RuntimeException here to halt startup if file storage is mandatory
        }
    }

    @Async
    @Transactional // ⬅️ NEW: Ensure DB save is transactional
    public void processMaterialUpload(Long topicId, MultipartFile[] files, Long userId) {
        
        System.out.println("Starting asynchronous processing for Topic ID: " + topicId + " by User ID: " + userId);
        
        // CRITICAL FIX 1: Fetch the Topic and User entities once
        Optional<Topic> topicOpt = topicRepository.findById(topicId);
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (!topicOpt.isPresent() || !userOpt.isPresent()) {
             System.err.println("❌ FAILED: Topic or User not found. Topic ID: " + topicId + ", User ID: " + userId);
             return; // Cannot proceed without valid entities
        }

        Topic topic = topicOpt.get();
        User user = userOpt.get();
        
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
                
                // CRITICAL FIX 2: Set the required entity references (Topic and User)
                // Assuming your LearningMaterial entity uses Topic and User objects for the foreign keys:
                material.setTopic(topic); // Set the actual Topic entity
                material.setUploadedBy(user); // Set the actual User entity 
                
                // Fallback if your entity uses IDs directly (Less common with Spring Data JPA):
                // material.setTopicId(topicId); 
                // material.setUploadedByUserId(userId); 
                
                material.setFileName(file.getOriginalFilename());
                material.setFileUrl("/files/" + fileName); 
                material.setMimeType(file.getContentType());
                material.setStatus("READY"); 
                
                materialRepository.save(material);
                
                System.out.println("✅ SUCCESSFULLY PROCESSED & SAVED file: " + file.getOriginalFilename() + " for Topic ID: " + topicId);
                
            } catch (Exception e) {
                // ⚠️ IMPROVEMENT: Print the full stack trace for better debugging
                System.err.println("❌ FAILED to process and save file: " + file.getOriginalFilename() + ". Check for DB foreign key issues or file permissions.");
                e.printStackTrace(); // Print the full error
            }
        }
        System.out.println("Asynchronous processing complete for Topic ID: " + topicId);
    }
}