// src/main/java/com/thesensationals/campuslearn/service/ForumService.java

package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.repository.ForumCategoryRepository;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;

@Service
public class ForumService {

    // 1. Final fields for repositories
    private final ForumCategoryRepository categoryRepository;
    private final ForumThreadRepository threadRepository;

    // 2. Constructor Injection (preferred over @Autowired field injection)
    public ForumService(ForumCategoryRepository categoryRepository, ForumThreadRepository threadRepository) {
        this.categoryRepository = categoryRepository;
        this.threadRepository = threadRepository;
    }

    // --- Category Methods (Used by ForumsPage.tsx) ---

    public List<ForumCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<ForumCategory> getCategoryBySlug(String slug) {
        // Renamed method to return Optional for better error handling in the controller
        return categoryRepository.findBySlug(slug);
    }
    
    // --- Thread Methods (Used by ForumThreadListPage.tsx) ---

    public List<ForumThread> getThreadsByCategorySlug(String categorySlug) {
        // 🚀 THE FIX: Changed to the correct repository method name
        return threadRepository.findByForumCategory_Slug(categorySlug);
    }
}