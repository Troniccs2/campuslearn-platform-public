// src/main/java/.../controller/ForumThreadViewController.java

package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.ForumThreadView; 
import com.thesensationals.campuslearn.service.ForumThreadViewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

// 🚀 CLASS NAME ENFORCED: ForumThreadViewController
@RestController
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
     * Maps to: /api/forums/view/{categorySlug}/{threadSlug} - PATH IS NOW UNIQUE!
     */
    // 🛑 CRITICAL FIX: CHANGED THE PATH TO INCLUDE "/view" 
    @GetMapping("/view/{categorySlug}/{threadSlug}") 
    public ResponseEntity<ForumThreadView> getForumThreadViewDetails( 
            @PathVariable String categorySlug,
            @PathVariable String threadSlug) {
        
        Optional<ForumThreadView> thread = forumThreadViewService.getThreadViewBySlugs(categorySlug, threadSlug); 

        if (thread.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(thread.get());
    }
}