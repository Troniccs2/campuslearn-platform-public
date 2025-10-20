package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.LearningMaterial;
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User; // ADDED
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import com.thesensationals.campuslearn.repository.TopicRepository;
import com.thesensationals.campuslearn.service.TopicService; // ADDED
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
    private final TopicService topicService; // ADDED

    public LearningMaterialController(
            UploadService uploadService, 
            LearningMaterialRepository materialRepository,
            TopicRepository topicRepository,
            TopicService topicService // ADDED: Inject TopicService
    ) {
        this.uploadService = uploadService;
        this.materialRepository = materialRepository;
        this.topicRepository = topicRepository;
        this.topicService = topicService;
    }

    // 1. ENDPOINT FOR ASYNCHRONOUS UPLOAD (FIXED USER ID EXTRACTION)
    @PostMapping("/topics/{topicId}/materials/upload")
    public ResponseEntity<String> uploadMaterials(
            @PathVariable Long topicId,
            @RequestParam("files") MultipartFile[] files,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        if (files.length == 0) {
            return ResponseEntity.badRequest().body("No files selected for upload.");
        }
        
        // ⚠️ FIX: Safely extract the ID from the authenticated principal
        if (!(userDetails instanceof User)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authenticated user type is invalid.");
        }
        Long userId = ((User) userDetails).getId();
        
        uploadService.processMaterialUpload(topicId, files, userId);
        
        return ResponseEntity.accepted().body("Files accepted and processing started in the background.");
    }
    
    // 2. ENDPOINT TO FETCH MATERIALS BY ID
    @GetMapping("/topics/{topicId}/materials")
    public ResponseEntity<List<LearningMaterial>> getMaterialsForTopic(@PathVariable Long topicId) {
        List<LearningMaterial> materials = materialRepository.findByTopicId(topicId);
        return ResponseEntity.ok(materials);
    }
    
    // 3. ENDPOINT (Uses Slug to find materials) 
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
    
    // 4. NEW FEATURE: ENDPOINT TO ENROLL STUDENTS TO A TOPIC
    @PostMapping("/topics/{topicId}/enroll-students")
    public ResponseEntity<Topic> enrollStudentsToTopic(
        @PathVariable Long topicId,
        @RequestBody List<Long> studentIds) {
    
        Topic updatedTopic = topicService.enrollStudents(topicId, studentIds);
    
        return ResponseEntity.ok(updatedTopic);
    }
}