package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;
import com.thesensationals.campuslearn.repository.ForumPostRepository;
import com.thesensationals.campuslearn.dto.ForumThreadDTO; 
import com.thesensationals.campuslearn.util.SlugGenerator; // Assuming you have this utility
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
public class ForumThreadService {

    private final ForumThreadRepository threadRepository;
    private final ForumPostRepository forumPostRepository;
    // Assuming ForumCategoryRepository or similar is needed for category lookups
    // private final ForumCategoryRepository categoryRepository; 

    // Constructor Injection 
    // Removed dependency on ForumService to prevent circular dependency issues
    public ForumThreadService(ForumThreadRepository threadRepository, ForumPostRepository forumPostRepository) { 
        this.threadRepository = threadRepository;
        this.forumPostRepository = forumPostRepository;
        // this.categoryRepository = categoryRepository; // If needed, inject here
    }

    // --- CRUD/Logic Methods ---

    /**
     * Creates a new thread and sets the unique slug.
     */
    public ForumThreadDTO createThread(ForumThreadDTO creationDto) {
        ForumThread thread = new ForumThread();
        
        // 1. Map DTO fields
        thread.setTitle(creationDto.getTitle());
        thread.setContent(creationDto.getContent());
        // ... set other fields like creator, dates, etc.
        
        // 2. Generate and set the unique slug
        String baseSlug = SlugGenerator.generate(creationDto.getTitle());
        // CRITICAL: Ensure you are setting the topicName property on the JPA Entity
        thread.setTopicName(baseSlug); 
        
        // 3. Set the category (re-implement category lookup here if needed)
        // ForumCategory category = categoryRepository.findBySlug(creationDto.getCategorySlug()).orElseThrow(...);
        // thread.setForumCategory(category); 
        
    ForumThread savedThread = threadRepository.save(thread);

    return new ForumThreadDTO(savedThread, 0L); 
    }

    /**
     * Fetches all threads for a given category slug.
     * This method is used by the ForumThreadController.
     */
    public List<ForumThreadDTO> getThreadsByCategorySlug(String categorySlug) {
        // Fetches by the category's slug property on the ForumThread entity
        List<ForumThread> threads = threadRepository.findByForumCategory_Slug(categorySlug); 
        
    return threads.stream()
            .sorted(Comparator.comparing(ForumThread::getLastUpdated, Comparator.nullsLast(Comparator.naturalOrder())).reversed())
            .map(thread -> new ForumThreadDTO(thread, forumPostRepository.countByThread_Id(thread.getId()))) 
            .collect(Collectors.toList());
    }
    
    /**
     * Retrieves a single thread by its category slug and thread slug (topicName).
     * This method is used by the ForumThreadController.
     */
    public ForumThreadDTO getThreadBySlugs(String categorySlug, String threadSlug) {
        
        Optional<ForumThread> threadOptional = threadRepository
                // Finds by category slug and the thread's topicName (which is the slug)
                .findByForumCategory_SlugAndTopicName(categorySlug, threadSlug);

        // Maps the entity to the DTO if present, otherwise returns null
    return threadOptional
        .map(thread -> new ForumThreadDTO(thread, forumPostRepository.countByThread_Id(thread.getId())))
        .orElse(null);
    }
    
    // Add other necessary methods (e.g., update, delete) here
}