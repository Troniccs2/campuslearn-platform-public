package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.LearningMaterial;
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import com.thesensationals.campuslearn.repository.TopicRepository;
import com.thesensationals.campuslearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.dao.DataIntegrityViolationException;

import java.io.IOException; 
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.time.Instant; 

@Service
public class UploadService {

    private final LearningMaterialRepository materialRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;
    private final String UPLOAD_DIR; 

    public UploadService(
            LearningMaterialRepository materialRepository,
            TopicRepository topicRepository,
            UserRepository userRepository,
            @Value("${file.upload-dir:uploads/learning_materials/}") String uploadDir 
    ) {
        this.materialRepository = materialRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.UPLOAD_DIR = uploadDir;
        
        // Ensure the upload directory exists upon startup
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            System.out.println("✅ Upload directory checked/created: " + UPLOAD_DIR);
        } catch (IOException e) { 
            String msg = "❌ CRITICAL: Could not create upload directory: " + UPLOAD_DIR + ". Check permissions/path.";
            System.err.println(msg);
            throw new RuntimeException(msg, e); 
        }
    }

    /**
     * Processes the file upload, saving the file to disk and the metadata to the database.
     */
    @Transactional 
    public void processMaterialUpload(Long topicId, MultipartFile[] files, Long userId) {
        
        System.out.println("Starting synchronous processing for Topic ID: " + topicId + " by User ID: " + userId);
        
        // 1. Fetch the Topic and User entities
        Optional<Topic> topicOpt = topicRepository.findById(topicId);
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (topicOpt.isEmpty() || userOpt.isEmpty()) {
              System.err.println("❌ FAILED: Topic or User not found. Topic ID: " + topicId + ", User ID: " + userId);
              throw new IllegalArgumentException("Topic or User ID is invalid. Could not link material."); 
        }

        Topic topic = topicOpt.get();
        User user = userOpt.get();
        
        for (MultipartFile file : files) {
            if (file.isEmpty() || file.getOriginalFilename() == null) continue;
            
            // NOTE: originalFileName may contain the folder structure from webkitdirectory upload!
            String originalFileName = file.getOriginalFilename();
            
            try {
                // --- 2. FILE SYSTEM OPERATIONS ---
                
                // IMPORTANT: We need to replace ALL illegal path separators from the originalFileName
                String sanitizedOriginalFileName = originalFileName.replaceAll("[/\\\\\\s]", "_");

                String fileNameOnDisk = System.currentTimeMillis() + "_" + sanitizedOriginalFileName;
                
                // Build the final path in the UPLOAD_DIR
                Path filePath = Paths.get(UPLOAD_DIR, fileNameOnDisk);

                // Explicitly catch IOException during file copy
                try {
                    Path directoryPath = filePath.getParent();
                    // ✅ FIX APPLIED HERE: The directory creation must be done inside the IOException handling block.
                    Files.createDirectories(directoryPath); 
                    
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException ioE) {
                    System.err.println("❌ I/O ERROR: Failed to save file to disk or read stream: " + originalFileName);
                    ioE.printStackTrace();
                    // Re-throw as a RuntimeException to trigger transaction rollback
                    throw new RuntimeException("File system error during upload: " + ioE.getMessage(), ioE);
                }
                
                // --- 3. DATABASE OPERATIONS ---
                LearningMaterial material = new LearningMaterial();
                
                // Set entity references
                material.setTopic(topic); 
                material.setUploadedBy(user); 
                
                // Set file details and mandatory fields
                material.setFileName(originalFileName); // Use original name for display
                material.setTitle(originalFileName.length() > 255 ? originalFileName.substring(0, 250) + "..." : originalFileName);
                material.setFileUrl("/files/" + fileNameOnDisk); // Use the sanitized name for the URL link
                material.setMimeType(file.getContentType());
                material.setStatus("READY"); 
                material.setCreationDate(Instant.now()); 
                
                try {
                    materialRepository.save(material);
                    System.out.println("✅ SUCCESSFULLY PROCESSED & SAVED file: " + originalFileName);
                
                // Explicitly catch DataIntegrityViolationException
                } catch (DataIntegrityViolationException dbEx) { 
                    System.err.println("❌ DB ERROR: Mandatory field missing or constraint violated for file: " + originalFileName);
                    System.err.println("Database Error Detail (Check for the column!): " + dbEx.getRootCause().getMessage());
                    throw new RuntimeException("Database save failed: " + dbEx.getRootCause().getMessage(), dbEx);

                } catch (Exception dbEx) {
                    System.err.println("❌ GENERIC DATABASE SAVE FAILED for file: " + originalFileName);
                    dbEx.printStackTrace(); 
                    throw new RuntimeException("Database save failed due to unexpected error.", dbEx);
                }

            } catch (RuntimeException e) { 
                // Catches exceptions re-thrown from I/O and DB blocks to allow transaction rollback
                throw e; 
            }
        }
        System.out.println("Synchronous processing complete for Topic ID: " + topicId);
    }
}