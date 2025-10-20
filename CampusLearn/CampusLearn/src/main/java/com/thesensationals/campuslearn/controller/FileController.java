package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.service.FileService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
     * Endpoint to handle the folder (multiple files) upload.
     * POST /api/files/upload/{topicId}
     */
    @PostMapping("/upload/{topicId}")
    public ResponseEntity<String> uploadTopicFiles(
            @PathVariable String topicId,
            @RequestParam("files") MultipartFile[] files) { // Correctly accepts multiple files

        if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().body("No files selected for upload.");
        }
        
        List<MultipartFile> fileList = Arrays.asList(files);
        System.out.println("Received " + fileList.size() + " files for topic ID: " + topicId);

        // Iterate and process each file from the folder asynchronously
        fileList.forEach(file -> {
            try {
                fileService.storeFileAsync(file, topicId);
            } catch (Exception e) {
                System.err.println("Error initiating storeFileAsync for " + file.getOriginalFilename() + ": " + e.getMessage());
                e.printStackTrace();
            }
        });

        return ResponseEntity.ok("File processing initiated in the background for " + files.length + " files.");
    }
    
    /**
     * Endpoint to serve the learning material file.
     * **FORCES DOWNLOAD** to eliminate white page errors from failed inline viewing.
     * * 🛑 FIX APPLIED: Changed mapping from "/download/{fileName:.+}" to "/download/files/{fileName:.+}" 
     * to correctly handle the extra 'files/' segment that is present in the requested URL.
     */
    @GetMapping("/download/files/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        
        // 🛑 NEW CRITICAL LOGGING LINE - WILL APPEAR IN YOUR TERMINAL 🛑
        System.out.println("\n------------------------------------------------------------");
        System.out.println(">>> FILE DOWNLOAD REQUEST RECEIVED for: " + fileName);
        System.out.println("------------------------------------------------------------\n");
        // 🛑 END NEW LOGGING 🛑

        Resource resource;
        try {
            // Note: Since the mapping is now /download/files/{fileName:.+}, 
            // the 'fileName' variable will only contain the actual file name (e.g., '1760965661881_DBD381_file1.pdf'). 
            // If your fileService expects the full path (including the 'files/' prefix), 
            // you may need to adjust how your fileService handles the path internally, but 
            // based on standard practice, it usually only needs the name. 
            // If you get a file not found error after this fix, we'll look at the service next.

            resource = fileService.loadFileAsResource(fileName);
        } catch (IOException e) {
            System.err.println("❌ FAILED: File not found or IO error for: " + fileName + ". Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }

        // Determine content type based on file extension
        String contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        if (fileName.toLowerCase().endsWith(".pdf")) {
            contentType = MediaType.APPLICATION_PDF_VALUE; 
        } else if (fileName.toLowerCase().endsWith(".docx")) {
            contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        }
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                // Use 'attachment' to force the browser to DOWNLOAD the file.
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
