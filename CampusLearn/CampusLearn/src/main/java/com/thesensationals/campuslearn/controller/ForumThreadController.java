package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.dto.ForumThreadDTO;
import com.thesensationals.campuslearn.service.ForumThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forums")
public class ForumThreadController {

    private final ForumThreadService threadService;

    @Autowired
    public ForumThreadController(ForumThreadService threadService) {
        // Spring automatically injects the ForumThreadService instance here
        this.threadService = threadService;
    }

    /**
     * Endpoint to fetch all threads for a specific category slug.
     * Maps to the frontend API call: /forums/{categorySlug}/threads
     * The threadService handles retrieving the data with the necessary topicName slug.
     */
    @GetMapping("/{categorySlug}/threads")
    public ResponseEntity<List<ForumThreadDTO>> getThreadsByCategory(
            @PathVariable String categorySlug) {
        
        List<ForumThreadDTO> threads = threadService.getThreadsByCategorySlug(categorySlug);
        
        // This is the correct list response needed by the ForumThreadListPage.tsx
        return ResponseEntity.ok(threads); 
    }

    /**
     * Endpoint to create a new thread.
     * Maps to a POST request when a user submits the "Create Thread" form.
     * The threadService handles generating and saving the unique topicName (slug).
     */
    @PostMapping("/create")
    public ResponseEntity<ForumThreadDTO> createThread(@RequestBody ForumThreadDTO threadDto) {
        // You should validate the DTO here before passing it to the service
        if (threadDto.getTitle() == null || threadDto.getTitle().trim().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // The service layer handles creating the entity and assigning the slug
        ForumThreadDTO newThread = threadService.createThread(threadDto);
        
        // Returns the newly created thread object, which includes the generated slug
        return new ResponseEntity<>(newThread, HttpStatus.CREATED);
    }
    
    /**
     * Endpoint to view a specific thread by its category and thread slug.
     * This corresponds to the ForumThreadViewPage.tsx in the frontend.
     */
    @GetMapping("/{categorySlug}/{threadSlug}")
    public ResponseEntity<ForumThreadDTO> getThreadDetails(
            @PathVariable String categorySlug,
            @PathVariable String threadSlug) {

        ForumThreadDTO thread = threadService.getThreadBySlugs(categorySlug, threadSlug);
        
        if (thread == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        return ResponseEntity.ok(thread);
    }
}