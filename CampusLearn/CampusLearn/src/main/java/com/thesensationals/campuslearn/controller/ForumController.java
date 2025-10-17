// src/main/java/com/thesensationals/campuslearn.controller/ForumController.java

package com.thesensationals.campuslearn.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.service.ForumService;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    private final ForumService forumService;

    // Constructor Injection
    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    // Endpoint: GET /api/forums/categories (Used by ForumsPage.tsx)
    @GetMapping("/categories")
    public List<ForumCategory> getAllCategories() {
        return forumService.getAllCategories();
    }
    
    // Endpoint: GET /api/forums/categories/{slug} 
    // This is primarily for getting category details if needed
    @GetMapping("/categories/{slug}")
    public ForumCategory getCategoryBySlug(@PathVariable String slug) {
        return forumService.getCategoryBySlug(slug)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, 
                "Forum category not found with slug: " + slug
            ));
    }

    // Endpoint: GET /api/forums/{categorySlug}/threads (Used by ForumThreadListPage.tsx)
    @GetMapping("/{categorySlug}/threads")
    public List<ForumThread> getThreads(@PathVariable String categorySlug) {
        return forumService.getThreadsByCategorySlug(categorySlug);
    }
}