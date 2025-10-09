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

    private ForumPostService forumPostService;

    public ResponseEntity<ForumPost> createPost(@RequestBody ForumPost post) {
        return null;
    }

    public ResponseEntity<ForumPost> getPostById(@PathVariable Long id) {
        return null;
    }

    public List<ForumPost> getAllPosts() {
        return null;
    }

    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        return null;
    }
}