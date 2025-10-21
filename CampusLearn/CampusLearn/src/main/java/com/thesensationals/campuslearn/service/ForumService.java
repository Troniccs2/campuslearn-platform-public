package com.thesensationals.campuslearn.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Comparator;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service; 
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.thesensationals.campuslearn.dto.ForumCategoryDTO; 
import com.thesensationals.campuslearn.dto.ForumThreadDTO; 
import com.thesensationals.campuslearn.dto.ForumCategoryCreateRequest;
import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.ForumCategoryRepository;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;
import com.thesensationals.campuslearn.repository.ForumPostRepository;
import com.thesensationals.campuslearn.util.SlugGenerator;

@Service 
public class ForumService {

    private final ForumCategoryRepository categoryRepository;
    private final ForumThreadRepository threadRepository;
    private final ForumPostRepository forumPostRepository;
    private final AuthenticationService authenticationService;

    public ForumService(
            ForumCategoryRepository categoryRepository,
            ForumThreadRepository threadRepository,
            ForumPostRepository forumPostRepository,
            AuthenticationService authenticationService) {
        this.categoryRepository = categoryRepository;
        this.threadRepository = threadRepository;
        this.forumPostRepository = forumPostRepository;
        this.authenticationService = authenticationService;
    }

    // --- Category Methods (Unchanged) ---

    public List<ForumCategoryDTO> getAllCategories() {
        return categoryRepository.findAll(Sort.by(Sort.Direction.DESC, "lastUpdated")).stream() 
                .map(this::convertToDto) 
                .collect(Collectors.toList());
    }

    private ForumCategoryDTO convertToDto(ForumCategory category) {
        return new ForumCategoryDTO(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getDescription(),
                category.getLastAuthor(),
                category.getLastUpdated() != null ? category.getLastUpdated().toString() : null
        );
    }
    
    public Optional<ForumCategory> getCategoryBySlug(String slug) {
        return categoryRepository.findBySlug(slug);
    }

    public Optional<ForumCategoryDTO> getCategoryDtoBySlug(String slug) {
        return getCategoryBySlug(slug).map(this::convertToDto);
    }

    public ForumCategoryDTO createCategory(ForumCategoryCreateRequest request) {
        String trimmedName = Optional.ofNullable(request.getName())
            .map(String::trim)
            .filter(name -> !name.isEmpty())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category name is required."));

        User currentUser = authenticationService.getCurrentUser()
            .orElseThrow(() -> new AccessDeniedException("User must be authenticated to create a forum category."));

        String baseSlug = SlugGenerator.generate(trimmedName);
        String slugCandidate = baseSlug;
        int suffix = 1;
        while (categoryRepository.findBySlug(slugCandidate).isPresent()) {
            slugCandidate = baseSlug + "-" + suffix++;
        }

        ForumCategory category = new ForumCategory();
        category.setName(trimmedName);
        category.setSlug(slugCandidate);
        category.setDescription(Optional.ofNullable(request.getDescription())
            .map(String::trim)
            .filter(desc -> !desc.isEmpty())
            .orElse(null));
        category.setLastAuthor(currentUser.getFirstName() + " " + currentUser.getLastName());
        category.setLastUpdated(Instant.now());

        ForumCategory saved = categoryRepository.save(category);
        return convertToDto(saved);
    }
    
    // --- Thread Methods (CRITICAL CHECK) ---

    // Correctly returns DTO List
    @Transactional(readOnly = true)
    public List<ForumThreadDTO> getThreadsByCategorySlug(String categorySlug) {
        // Uses the correct Repository method to fetch by relationship slug
        return threadRepository.findByForumCategory_Slug(categorySlug).stream()
            .sorted(Comparator.comparing(ForumThread::getLastUpdated, Comparator.nullsLast(Comparator.naturalOrder())).reversed())
            .map(this::convertThreadToDto)
            .collect(Collectors.toList());
    }

    /**
     * Finds a single thread, returns DTO.
     */
    @Transactional(readOnly = true)
    public Optional<ForumThreadDTO> getThreadBySlugs(String categorySlug, String threadSlug) {
        // Note: threadSlug in the path maps to topicName in the repository method
        return threadRepository.findByForumCategory_SlugAndTopicName(categorySlug, threadSlug)
            .map(this::convertThreadToDto);
    }

    private ForumThreadDTO convertThreadToDto(ForumThread thread) {
        long replyCount = thread.getId() != null ? forumPostRepository.countByThread_Id(thread.getId()) : 0L;
        ForumThreadDTO dto = new ForumThreadDTO(thread, replyCount);
        if (dto.getAuthorName() == null && thread.getForumCategory() != null) {
            dto.setAuthorName(thread.getForumCategory().getLastAuthor());
        }
        return dto;
    }
}