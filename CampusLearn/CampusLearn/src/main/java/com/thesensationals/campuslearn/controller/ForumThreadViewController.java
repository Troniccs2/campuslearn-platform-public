package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.ForumThreadView; // 🚀 FIX 1: Import the correct view entity
import com.thesensationals.campuslearn.service.ForumThreadViewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

// 🚀 CLASS NAME ENFORCED: ForumThreadViewController
@RestController
// The mapping remains the same to match your front-end routing
@RequestMapping("/api/forums") 
@CrossOrigin(origins = "http://localhost:5173") 
public class ForumThreadViewController {

    private final ForumThreadViewService forumThreadViewService; 

    // Inject the dedicated view service
    public ForumThreadViewController(ForumThreadViewService forumThreadViewService) {
        this.forumThreadViewService = forumThreadViewService; 
    }

    /**
     * Endpoint to fetch a single thread by categorySlug and threadSlug.
     * It now returns the fully loaded ForumThreadView entity.
     * Maps to: /api/forums/{categorySlug}/{threadSlug}
     */
    @GetMapping("/{categorySlug}/{threadSlug}")
    public ResponseEntity<ForumThreadView> getForumThreadViewDetails( // 🚀 FIX 2: Correct return type in ResponseEntity
            @PathVariable String categorySlug,
            @PathVariable String threadSlug) {
        
        // Use the dedicated service method
        // 🚀 FIX 3: Correct the local variable type
        Optional<ForumThreadView> thread = forumThreadViewService.getThreadViewBySlugs(categorySlug, threadSlug); 

        if (thread.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(thread.get());
    }
}