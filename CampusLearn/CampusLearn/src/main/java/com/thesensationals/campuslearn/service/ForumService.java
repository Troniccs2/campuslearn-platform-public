package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.Optional; // Needed for Optional usage

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.repository.ForumCategoryRepository;

@Service
public class ForumService {

    // Using final and constructor injection is preferred over @Autowired on the field
    private final ForumCategoryRepository categoryRepository;
    
    // Spring Boot automatically handles the wiring (injection) here
    public ForumService(ForumCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // 1. Fetch all categories for the main ForumsPage
    public List<ForumCategory> getAllCategories() {
        // Data will be loaded from PostgreSQL via data.sql/JPA
        return categoryRepository.findAll();
    }
    
    // 2. Fetch a single category by slug (for navigation/ForumListPage)
    public ForumCategory getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug)
            .orElseThrow(() -> new RuntimeException("Category not found: " + slug));
    }
    
    // NOTE: The initializeCategories() method has been removed 
    // to prevent hardcoding data and fix the constructor errors.
}