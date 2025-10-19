package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service; 

import com.thesensationals.campuslearn.dto.ForumCategoryDTO; 
import com.thesensationals.campuslearn.dto.ForumThreadDTO; 
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
        return new ForumCategoryDTO(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getLastAuthor(),
                category.getLastUpdated().toEpochMilli()
        );
    }
    
    public Optional<ForumCategory> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }
    
    // --- Thread Methods ---

    // Fixed to return DTO List
    public List<ForumThreadDTO> getThreadsByCategorySlug(String categorySlug) {
        return threadRepository.findByForumCategory_Slug(categorySlug).stream()
            .map(ForumThreadDTO::new) 
            .collect(Collectors.toList()); 
    }

    /**
     * Finds a single thread, fixed to return DTO.
     */
    public Optional<ForumThreadDTO> getThreadBySlugs(String categorySlug, String threadSlug) {
        return threadRepository.findByForumCategory_SlugAndTopicName(categorySlug, threadSlug)
            .map(ForumThreadDTO::new); 
    }
}