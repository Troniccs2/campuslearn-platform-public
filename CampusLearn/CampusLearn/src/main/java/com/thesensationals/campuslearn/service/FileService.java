package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.LearningMaterial;
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User; 
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import com.thesensationals.campuslearn.repository.TopicRepository;
import com.thesensationals.campuslearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.dao.DataIntegrityViolationException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.Optional;

@Service
public class FileService {

    private final Path fileStorageLocation;
    private final LearningMaterialRepository materialRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository; 

    public FileService(
            LearningMaterialRepository materialRepository,
            TopicRepository topicRepository,
            UserRepository userRepository,
            @Value("${file.upload-dir:uploads/learning_materials/}") String uploadDir
    ) throws IOException {
        this.materialRepository = materialRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        
        // Define and create the storage directory, ensuring it's absolute and normalized
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);
        System.out.println("FileService initialized. Storage location: " + this.fileStorageLocation);
    }

    /**
     * Stores a single file (called once per file in the uploaded folder).
     */
    @Async
    @Transactional
    public void storeFileAsync(MultipartFile file, String topicIdStr) throws IOException {
        if (file.isEmpty() || file.getOriginalFilename() == null) return;
        
        Long topicId = Long.parseLong(topicIdStr);
        Long userId = 1L; // Placeholder: Replace with actual user ID logic
        
        Optional<Topic> topicOpt = topicRepository.findById(topicId);
        Optional<User> userOpt = userRepository.findById(userId);

        if (topicOpt.isEmpty() || userOpt.isEmpty()) {
              System.err.println("❌ FAILED: Topic or User not found for upload.");
              throw new IllegalArgumentException("Topic or User ID is invalid."); 
        }

        Topic topic = topicOpt.get();
        User user = userOpt.get();
        String originalFileName = file.getOriginalFilename();
        
        String sanitizedOriginalFileName = originalFileName.replaceAll("[/\\\\\\s]", "_");
        String fileNameOnDisk = Instant.now().toEpochMilli() + "_" + sanitizedOriginalFileName;
        
        try {
            // 1. Save file to disk
            Path targetLocation = this.fileStorageLocation.resolve(fileNameOnDisk);
            // This copies the stream fully for the single file
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // 2. Save metadata to DB
            LearningMaterial material = new LearningMaterial();
            material.setTopic(topic);
            material.setUploadedBy(user);
            material.setFileName(originalFileName);
            material.setTitle(originalFileName.length() > 255 ? originalFileName.substring(0, 250) + "..." : originalFileName);
            material.setFileUrl("/api/files/download/" + fileNameOnDisk); 
            material.setMimeType(file.getContentType());
            material.setStatus("READY");
            material.setCreationDate(Instant.now());

            materialRepository.save(material);
            System.out.println("✅ ASYNC SUCCESS: " + originalFileName);

        } catch (DataIntegrityViolationException dbEx) {
            System.err.println("❌ DB ERROR: Mandatory field missing or constraint violated for file: " + originalFileName);
            throw new RuntimeException("Database save failed.", dbEx);
        } catch (IOException ioE) {
            System.err.println("❌ I/O ERROR: Failed to save file to disk: " + originalFileName);
            ioE.printStackTrace();
            throw ioE;
        }
    }

    /**
     * Loads a file from the disk to be streamed to the client.
     */
    public Resource loadFileAsResource(String fileName) throws IOException {
        try {
            // Resolve the file path (crucial: normalize prevents directory traversal attacks)
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            
            Resource resource = new UrlResource(filePath.toUri());
            
            // Check if the file exists and is readable
            if (resource.exists() && resource.isReadable()) {
                
                // 🛑 CRITICAL DEBUGGING LINE: CHECK FILE SIZE 🛑
                long fileSize = Files.size(filePath);
                System.out.println("✅ DEBUG: Found and reading file: " + fileName + ", Size: " + fileSize + " bytes.");
                if (fileSize == 0) {
                    System.err.println("⚠️ WARNING: File is 0 bytes. It was likely saved incorrectly.");
                }
                
                return resource;
            } else {
                // Throw an exception if the file cannot be found or is not readable
                System.err.println("❌ I/O FAILURE: File does not exist or is not readable: " + filePath.toString());
                throw new IOException("File not found or not readable on disk: " + fileName);
            }
        } catch (MalformedURLException ex) {
            System.err.println("❌ PATH ERROR: Malformed URL for file: " + fileName);
            throw new IOException("File path invalid: " + fileName, ex);
        }
    }
}
