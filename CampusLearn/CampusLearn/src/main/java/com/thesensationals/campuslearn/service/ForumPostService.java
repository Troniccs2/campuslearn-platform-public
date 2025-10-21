package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.dto.ForumPostDto;
import com.thesensationals.campuslearn.model.ForumPost;
import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.repository.ForumPostRepository;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;

import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForumPostService {

    private final ForumPostRepository forumPostRepository;
    private final ForumThreadRepository forumThreadRepository;

    // Constructor Injection
    public ForumPostService(ForumPostRepository forumPostRepository, ForumThreadRepository forumThreadRepository) {
        this.forumPostRepository = forumPostRepository;
        this.forumThreadRepository = forumThreadRepository;
    }

    /**
     * Creates a new post (reply) within the specified thread.
     */
    public ForumPostDto createPostInThread(
        String categorySlug, 
        String threadSlug, 
        String content, 
        String authorName) 
    {
        // 1. Find the target thread
        ForumThread thread = forumThreadRepository
            // Assuming the method findByForumCategory_SlugAndTopicName exists in ForumThreadRepository
            .findByForumCategory_SlugAndTopicName(categorySlug, threadSlug) 
            .orElseThrow(() -> new RuntimeException("Thread not found with slugs: " + categorySlug + "/" + threadSlug));
        
        // 2. Create the new ForumPost entity
        ForumPost newPost = new ForumPost();
        newPost.setContent(content);
        newPost.setAuthorName(authorName);
        newPost.setPostedAt(Instant.now());
        
        // Link the post to the thread (Assuming the setter is setThread)
        newPost.setThread(thread); 

        // 3. Save the post
        ForumPost savedPost = forumPostRepository.save(newPost);
        
        // 4. Update the parent thread's 'lastUpdated' timestamp
        thread.setLastUpdated(Instant.now()); 
        forumThreadRepository.save(thread); 

        // 5. Convert and return the DTO
        return new ForumPostDto(savedPost); 
    }

    /**
     * Retrieves all posts (replies) for a specific thread.
     */
    public List<ForumPostDto> getPostsByThreadSlugs(String categorySlug, String threadSlug) {
        // 🚨 CRITICAL FIX: The repository method name is updated to match the property 'thread' 
        // in your ForumPost entity (findByThread_...)
        List<ForumPost> posts = forumPostRepository
            .findByThread_ForumCategory_SlugAndThread_TopicName(categorySlug, threadSlug);

        // Convert the entities to DTOs
        return posts.stream()
            .map(ForumPostDto::new) 
            .collect(Collectors.toList());
    }
}