package com.thesensationals.campuslearn.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.dto.ForumCategoryDTO;
import com.thesensationals.campuslearn.dto.ForumThreadDTO;
import com.thesensationals.campuslearn.dto.ForumPostCreationDTO; 
import com.thesensationals.campuslearn.dto.ForumPostDto; 
import com.thesensationals.campuslearn.service.ForumPostService; 

import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.service.ForumService;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    private final ForumService forumService;
    private final ForumPostService forumPostService; 

    public ForumController(ForumService forumService, ForumPostService forumPostService) {
        this.forumService = forumService;
        this.forumPostService = forumPostService;
    }

    // --- Category Endpoints ---

    @GetMapping("/categories") 
    public ResponseEntity<List<ForumCategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(forumService.getAllCategories());
    }

    @GetMapping("/{categorySlug}")
    public ResponseEntity<ForumCategoryDTO> getCategoryBySlug(@PathVariable String categorySlug) {
        Optional<ForumCategory> categoryOptional = forumService.getCategoryBySlug(categorySlug);
        
        if (categoryOptional.isPresent()) {
            return ResponseEntity.ok(convertToDto(categoryOptional.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    private ForumCategoryDTO convertToDto(ForumCategory category) {
        return new ForumCategoryDTO(
            category.getId(),
            category.getName(),
            category.getSlug(),
            category.getLastAuthor(),
            category.getLastUpdated().toEpochMilli() 
        );
    }

    // --- Thread Endpoints ---
    
    @GetMapping("/{categorySlug}/threads")
    public ResponseEntity<List<ForumThreadDTO>> getThreadsByCategorySlug(@PathVariable String categorySlug) {
        List<ForumThreadDTO> threads = forumService.getThreadsByCategorySlug(categorySlug);
        return ResponseEntity.ok(threads);
    }
    
    @GetMapping("/{categorySlug}/{threadSlug}")
    public ResponseEntity<ForumThreadDTO> getThreadDetail(
        @PathVariable String categorySlug, 
        @PathVariable String threadSlug) 
    {
        Optional<ForumThreadDTO> threadDTO = forumService.getThreadBySlugs(categorySlug, threadSlug);
        
        if (threadDTO.isPresent()) {
            return ResponseEntity.ok(threadDTO.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // 🚨 CRITICAL FIX: NEW ENDPOINT TO FETCH POSTS (REPLIES)
    @GetMapping("/{categorySlug}/{threadSlug}/posts")
    public ResponseEntity<List<ForumPostDto>> getPostsByThreadSlugs(
        @PathVariable String categorySlug, 
        @PathVariable String threadSlug) 
    {
        List<ForumPostDto> posts = forumPostService.getPostsByThreadSlugs(categorySlug, threadSlug);
        return ResponseEntity.ok(posts);
    }
    
    // 🚀 POST ENDPOINT TO HANDLE REPLIES
    @PostMapping("/{categorySlug}/{threadSlug}/reply") // Note: Changed to 'reply' to match typical frontend structure
    public ResponseEntity<?> createReply( 
        @PathVariable String categorySlug,
        @PathVariable String threadSlug,
        @RequestBody ForumPostCreationDTO postCreationDto
    ) {
        String currentUserName = "PlaceholderUser"; 
        
        try {
            // Note: Assuming createPostInThread returns the created DTO
            ForumPostDto newPost = forumPostService.createPostInThread( 
                categorySlug, 
                threadSlug, 
                postCreationDto.getContent(), 
                currentUserName
            );

            // Success: returns 201 CREATED with the ForumPostDto
            return new ResponseEntity<>(newPost, HttpStatus.CREATED);

        } catch (Exception ex) {
            System.err.println("Error creating reply: " + ex.getMessage());
            
            // Error: returns 400 BAD REQUEST 
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Error creating reply: " + ex.getMessage()); 
        }
    }
}