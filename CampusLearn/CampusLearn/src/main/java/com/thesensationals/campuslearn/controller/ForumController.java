package com.thesensationals.campuslearn.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.dto.ForumCategoryDTO;
import com.thesensationals.campuslearn.dto.ForumThreadDTO;
import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.service.ForumService;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    private final ForumService forumService;

    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    // --- Category Endpoints ---

    // FIX: Added "/categories" back to match the client's expected endpoint URL (GET /api/forums/categories)
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
    
    // Helper method with date conversion fix for category DTO
    private ForumCategoryDTO convertToDto(ForumCategory category) {
        return new ForumCategoryDTO(
            category.getId(),
            category.getName(),
            category.getSlug(),
            category.getLastAuthor(),
            category.getLastUpdated().toEpochMilli() // FIX: Date to Long conversion
        );
    }

    // --- Thread Endpoints ---
    
    // Endpoint for Thread List (Fixed to return DTOs) - URL: /api/forums/{categorySlug}/threads
    @GetMapping("/{categorySlug}/threads")
    public ResponseEntity<List<ForumThreadDTO>> getThreadsByCategorySlug(@PathVariable String categorySlug) {
        List<ForumThreadDTO> threads = forumService.getThreadsByCategorySlug(categorySlug);
        return ResponseEntity.ok(threads);
    }
    
    // Endpoint for Single Thread Detail Page (Fixed to return DTO) - URL: /api/forums/{categorySlug}/{threadSlug}
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
}