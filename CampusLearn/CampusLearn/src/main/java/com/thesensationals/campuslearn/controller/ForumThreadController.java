// src/main/java/.../controller/ForumThreadController.java

package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/forums") // Base path for forum-related API endpoints
public class ForumThreadController {

    private final ForumThreadRepository threadRepository;

    public ForumThreadController(ForumThreadRepository threadRepository) {
        this.threadRepository = threadRepository;
    }

    // 🚀 THE CRUCIAL FIX: This method handles the frontend's GET request:
    // /forums/{categorySlug}/threads
    @GetMapping("/{categorySlug}/threads")
    public List<ForumThread> getThreadsByCategorySlug(@PathVariable String categorySlug) {
        // Use the custom Spring Data JPA method to fetch threads
        return threadRepository.findByForumCategory_Slug(categorySlug);
    }
}