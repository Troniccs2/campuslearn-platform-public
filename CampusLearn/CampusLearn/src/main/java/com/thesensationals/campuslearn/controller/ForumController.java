package com.thesensationals.campuslearn.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.service.ForumService;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    // 1. Remove @Autowired on the field
    private final ForumService forumService;

    // 2. Use Constructor Injection (Spring automatically wires it)
    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    // Endpoint: GET /api/forums/categories
    @GetMapping("/categories")
    public List<ForumCategory> getAllCategories() {
        return forumService.getAllCategories();
    }
    
    // Endpoint: GET /api/forums/categories/{slug}
    @GetMapping("/categories/{slug}")
    public ForumCategory getCategoryBySlug(@PathVariable String slug) {
        return forumService.getCategoryBySlug(slug);
    }
}