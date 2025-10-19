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

    // Uses the clean constructor call (since DTO is fixed)
    private ForumCategoryDTO convertToDto(ForumCategory category) {
        return new ForumCategoryDTO(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getLastAuthor(),
                // Convert Instant to Long (milliseconds since epoch)
                category.getLastUpdated().toEpochMilli() 
        );
    }
    
    public Optional<ForumCategory> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }
    
    // --- Thread Methods ---

    public List<ForumThread> getThreadsByCategorySlug(String categorySlug) {
        // 🚀 FINAL FIX: Calling the Native Query method.
        // This is the fastest, most reliable way to force the correct SQL 
        // past the conflicting entity mapping for the thread list view.
        return threadRepository.findThreadsByCategorySlugNative(categorySlug); 
    }

    /**
     * This method is correct and was added to fix the controller compilation error.
     */
    public Optional<ForumThread> getThreadBySlugs(String categorySlug, String threadSlug) {
        // This convention-based method is correct for a single unique thread lookup.
        return threadRepository.findByForumCategorySlugAndSlug(categorySlug, threadSlug);
    }
}