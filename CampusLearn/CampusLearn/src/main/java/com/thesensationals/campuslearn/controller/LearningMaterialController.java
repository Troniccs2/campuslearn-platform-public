package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.LearningMaterial;
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User; 
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import com.thesensationals.campuslearn.repository.TopicRepository;
import com.thesensationals.campuslearn.repository.UserRepository;
import com.thesensationals.campuslearn.service.TopicService; 
import com.thesensationals.campuslearn.service.UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api") 
public class LearningMaterialController {

    private final UploadService uploadService;
    private final LearningMaterialRepository materialRepository;
    private final TopicRepository topicRepository;
    private final TopicService topicService; 
    private final UserRepository userRepository; 

    public LearningMaterialController(
            UploadService uploadService, 
            LearningMaterialRepository materialRepository,
            TopicRepository topicRepository,
            TopicService topicService,
            UserRepository userRepository
    ) {
        this.uploadService = uploadService;
        this.materialRepository = materialRepository;
        this.topicRepository = topicRepository;
        this.topicService = topicService;
        this.userRepository = userRepository;
    }

    // 1. ENDPOINT FOR UPLOAD
    // 🛑 FIX: Changed mapping to /topics/{topicId}/materials/upload to match the frontend
    @PostMapping("/topics/{topicId}/materials/upload") 
    public ResponseEntity<String> uploadMaterials(
            // 🛑 FIX: Changed parameter from String topicSlug to Long topicId
            @PathVariable Long topicId, 
            @RequestParam("files") MultipartFile[] files,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        if (files.length == 0) {
            return ResponseEntity.badRequest().body("No files selected for upload.");
        }
        
        // --- 🎯 USER ID EXTRACTION ---
        User user = userRepository.findByEmail(userDetails.getUsername()) 
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.FORBIDDEN, 
                "Authenticated user not found."
            ));

        Long userId = user.getId();
        
        // 🛑 REMOVED: The unnecessary slug-to-ID conversion is gone.
        // The topicId path variable is used directly.
        
        try {
            // Call the service with the topicId obtained directly from the URL
            uploadService.processMaterialUpload(topicId, files, userId);
            
            return ResponseEntity.accepted().body("Files accepted and processing started.");
            
        } catch (IllegalArgumentException e) {
             // Catch the error thrown by UploadService if Topic or User ID is invalid
             return ResponseEntity.badRequest().body(e.getMessage());
             
        } catch (Exception e) {
            // CRITICAL: Log the full error to the console for diagnosis
            System.err.println("❌ Upload processing failed unexpectedly: " + e.getMessage());
            e.printStackTrace();
            
            // Return a generic 500 status to the client
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during file processing: " + e.getMessage());
        }
    }
    
    // 2. ENDPOINT TO FETCH MATERIALS BY ID (Kept for internal use)
    @GetMapping("/topics/{topicId}/materials")
    public ResponseEntity<List<LearningMaterial>> getMaterialsForTopic(@PathVariable Long topicId) {
        List<LearningMaterial> materials = materialRepository.findByTopicId(topicId);
        return ResponseEntity.ok(materials);
    }
    
    // 3. ENDPOINT (Uses Slug to find materials) - Kept original functionality
    @GetMapping("/materials/topic/{topicSlug}")
    public ResponseEntity<List<LearningMaterial>> getMaterialsByTopicSlug(@PathVariable String topicSlug) {
        Topic topic = topicRepository.findByTopicName(topicSlug)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, 
                "Topic not found with slug: " + topicSlug
            ));

        List<LearningMaterial> materials = materialRepository.findByTopicId(topic.getId());
        
        return ResponseEntity.ok(materials);
    }
    
    // 4. ENDPOINT TO ENROLL STUDENTS TO A TOPIC
    @PostMapping("/topics/{topicId}/enroll-students")
    public ResponseEntity<Topic> enrollStudentsToTopic(
        @PathVariable Long topicId,
        @RequestBody List<Long> studentIds) {
    
        Topic updatedTopic = topicService.enrollStudents(topicId, studentIds);
    
        return ResponseEntity.ok(updatedTopic);
    }
}