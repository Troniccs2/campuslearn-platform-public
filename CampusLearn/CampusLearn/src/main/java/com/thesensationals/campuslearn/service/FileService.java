package com.thesensationals.campuslearn.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {

    // 🚨 IMPORTANT: Replace with a secure, absolute path on your server 🚨
    private final Path fileStorageLocation = Paths.get("./uploads/topic-content").toAbsolutePath().normalize();

    public FileService() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    /**
     * Saves a single file to the local file system in a dedicated topic folder.
     * Runs asynchronously in the background.
     */
    @Async
    public void storeFileAsync(MultipartFile file, String topicId) {
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.contains("..")) {
            throw new RuntimeException("Invalid file name: " + fileName);
        }

        Path topicFolder = this.fileStorageLocation.resolve(topicId);
        try {
            Files.createDirectories(topicFolder);
        } catch (IOException e) {
            System.err.println("Failed to create topic folder: " + topicId + " Error: " + e.getMessage());
            throw new RuntimeException("Could not create topic folder.", e);
        }

        Path targetLocation = topicFolder.resolve(fileName);
        try {
            // Copy the file content
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("✅ Successfully saved file: " + fileName + " for Topic: " + topicId);
            
            // 💡 TO DO: Save file metadata (fileName, targetLocation, topicId) to your PostgreSQL DB here.
            
        } catch (IOException ex) {
            System.err.println("❌ Failed to save file: " + fileName + " Error: " + ex.getMessage());
            throw new RuntimeException("Could not store file " + fileName + ". Please check file permissions!", ex);
        }
    }
}