package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.model.ForumThreadView; // 🚀 FIX 1: Import the dedicated view entity
import com.thesensationals.campuslearn.repository.ForumThreadViewRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

// 🚀 CLASS NAME ENFORCED: ForumThreadViewService
@Service
public class ForumThreadViewService {

    private final ForumThreadViewRepository threadViewRepository; 

    // Inject the dedicated view repository
    public ForumThreadViewService(ForumThreadViewRepository threadViewRepository) {
        this.threadViewRepository = threadViewRepository;
    }

    /**
     * Retrieves a single ForumThreadView (fully loaded with posts) by its category slug and thread slug.
     * @param categorySlug The slug of the parent category.
     * @param threadSlug The slug of the thread.
     * @return An Optional containing the ForumThreadView, or empty if not found.
     */
    // 🚀 FIX 2: Correct the return type and parameter type to ForumThreadView
    public Optional<ForumThreadView> getThreadViewBySlugs(String categorySlug, String threadSlug) { 
        return threadViewRepository.findThreadBySlugs(categorySlug, threadSlug);
    }
}