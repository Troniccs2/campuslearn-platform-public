package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service; 

import com.thesensationals.campuslearn.dto.ForumCategoryDTO; 
import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.repository.ForumCategoryRepository;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;

@Service 
public class ForumService {

    private final ForumCategoryRepository categoryRepository;
    private final ForumThreadRepository threadRepository;

    public ForumService(ForumCategoryRepository categoryRepository, ForumThreadRepository threadRepository) {
        this.categoryRepository = categoryRepository;
        this.threadRepository = threadRepository;
    }

    // --- Category Methods ---

    public List<ForumCategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream() 
                .map(this::convertToDto) 
                .collect(Collectors.toList());
    }

    private ForumCategoryDTO convertToDto(ForumCategory category) {
        // Line 40 is here
        return new ForumCategoryDTO(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getLastAuthor(),
                // CRITICAL FIX: Convert Instant to Long (milliseconds since epoch) for the DTO
                category.getLastUpdated().toEpochMilli()
        );
    }
    
    public Optional<ForumCategory> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }
    
    // --- Thread Methods ---

    public List<ForumThread> getThreadsByCategorySlug(String categorySlug) {
        return threadRepository.findByForumCategory_Slug(categorySlug);
    }
}