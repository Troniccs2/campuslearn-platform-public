// src/main/java/.../controller/ForumThreadController.java

package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.service.ForumService;
import org.springframework.http.ResponseEntity; // <-- ADDED for clear response codes
import org.springframework.web.bind.annotation.*;
// Assuming you have a DTO for thread views to match the ForumThreadListPage model
// import com.thesensationals.campuslearn.dto.ForumThreadDTO; 

import java.util.List;

@RestController
@RequestMapping("/api/forums") // 🛑 IMPORTANT: Assuming frontend calls /api/forums. Adjust if you use just /forums.
public class ForumThreadController {

    private final ForumService forumService;

    public ForumThreadController(ForumService forumService) {
        this.forumService = forumService;
    }

    // 1. LIST THREADS ENDPOINT (The one that was causing issues)
    // URL: /api/forums/{categorySlug}/threads
    @GetMapping("/{categorySlug}/threads")
    public List<ForumThread> getThreadsByCategorySlug(@PathVariable String categorySlug) {
        
        // This relies on ForumService.getThreadsByCategorySlug using 
        // threadRepository.findByForumCategorySlug(categorySlug);
        return forumService.getThreadsByCategorySlug(categorySlug); 
    }

    // 2. SINGLE THREAD VIEW ENDPOINT (MUST be included for full forum functionality)
    // URL: /api/forums/{categorySlug}/{threadSlug}
    @GetMapping("/{categorySlug}/{threadSlug}")
    public ResponseEntity<ForumThread> getSingleThread(
            @PathVariable String categorySlug,
            @PathVariable String threadSlug) {
        
        // This is the endpoint that executes the two-parameter query.
        // It relies on a separate service method (which you'll need to create).
        return forumService.getThreadBySlugs(categorySlug, threadSlug)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}