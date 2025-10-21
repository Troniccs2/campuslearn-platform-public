package com.thesensationals.campuslearn.controller;

import java.util.List;
import java.util.Optional;
import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.validation.Valid;

import com.thesensationals.campuslearn.dto.ForumCategoryDTO;
import com.thesensationals.campuslearn.dto.ForumThreadDTO;
import com.thesensationals.campuslearn.dto.ForumPostCreationDTO; 
import com.thesensationals.campuslearn.dto.ForumPostDto; 
import com.thesensationals.campuslearn.service.ForumPostService; 
import com.thesensationals.campuslearn.dto.ForumCategoryCreateRequest;
import com.thesensationals.campuslearn.service.ForumService;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.UserRepository;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    private final ForumService forumService;
    private final ForumPostService forumPostService;
    private final UserRepository userRepository;

    public ForumController(ForumService forumService, ForumPostService forumPostService, UserRepository userRepository) {
        this.forumService = forumService;
        this.forumPostService = forumPostService;
        this.userRepository = userRepository;
    }

    // --- Category Endpoints ---

    @GetMapping("/categories") 
    public ResponseEntity<List<ForumCategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(forumService.getAllCategories());
    }

    @GetMapping("/{categorySlug}")
    public ResponseEntity<ForumCategoryDTO> getCategoryBySlug(@PathVariable String categorySlug) {
        return forumService.getCategoryDtoBySlug(categorySlug)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public ForumCategoryDTO createCategory(@Valid @RequestBody ForumCategoryCreateRequest request) {
        return forumService.createCategory(request);
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
    @PostMapping("/{categorySlug}/{threadSlug}/reply")
    public ResponseEntity<?> createReply(
        @PathVariable String categorySlug,
        @PathVariable String threadSlug,
        @Valid @RequestBody ForumPostCreationDTO postCreationDto,
        Principal principal
    ) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("You must be signed in to reply");
        }

        Optional<User> currentUser = userRepository.findByEmail(principal.getName());
        if (currentUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Authenticated user could not be found");
        }

        try {
            ForumPostDto newPost = forumPostService.createPostInThread(
                categorySlug,
                threadSlug,
                postCreationDto.getContent(),
                currentUser.get()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
        } catch (Exception ex) {
            System.err.println("Error creating reply: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Unexpected error creating reply");
        }
    }
}