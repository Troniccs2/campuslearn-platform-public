package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.models.ForumPost;
import com.thesensationals.campuslearn.service.ForumPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class ForumPostController {

    private final ForumPostService forumPostService;


    public ForumPostController(ForumPostService forumPostService) {
        this.forumPostService = forumPostService;
    }

    @PostMapping
    public ResponseEntity<ForumPost> createPost(@RequestBody ForumPost post) {
        ForumPost saved = forumPostService.savePost(post);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ForumPost> getPostById(@PathVariable Long id) {
        Optional<ForumPost> post = forumPostService.getPostById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ForumPost> getAllPosts() {
        return forumPostService.getAllPosts();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean deleted = forumPostService.deletePost(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}