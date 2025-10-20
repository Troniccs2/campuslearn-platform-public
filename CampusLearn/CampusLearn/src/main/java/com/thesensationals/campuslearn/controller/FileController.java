package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    /**
     * Endpoint to handle the file upload from the frontend after a topic is created.
     * The frontend's FileDropZone component will POST to this endpoint.
     * POST /api/files/upload/{topicId}
     */
    @PostMapping("/upload/{topicId}")
    public ResponseEntity<String> uploadTopicFiles(
            @PathVariable String topicId,
            // The name 'files' must match the name used in your frontend's FormData object
            @RequestParam("files") MultipartFile[] files) {

        if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().body("No files selected for upload.");
        }

        // 1. Process each file using the asynchronous service
        List<MultipartFile> fileList = Arrays.asList(files);
        
        System.out.println("Received " + fileList.size() + " files for topic ID: " + topicId);

        fileList.forEach(file -> {
            try {
                // Calls the @Async method in FileService
                fileService.storeFileAsync(file, topicId);
            } catch (Exception e) {
                // Log and continue, as the frontend expects one response for the batch
                System.err.println("Error initiating storeFileAsync for " + file.getOriginalFilename() + ": " + e.getMessage());
            }
        });

        // 2. Return a success response immediately, as processing is in the background
        return ResponseEntity.ok("File processing initiated in the background for " + files.length + " files.");
    }
}