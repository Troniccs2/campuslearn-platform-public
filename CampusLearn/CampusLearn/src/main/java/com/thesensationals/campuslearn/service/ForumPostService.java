package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.dto.ForumPostDto;
import com.thesensationals.campuslearn.model.ForumCategory;
import com.thesensationals.campuslearn.model.ForumPost;
import com.thesensationals.campuslearn.model.ForumThread;
import com.thesensationals.campuslearn.repository.ForumPostRepository;
import com.thesensationals.campuslearn.repository.ForumCategoryRepository;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;
import com.thesensationals.campuslearn.model.User;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
public class ForumPostService {

    private final ForumPostRepository forumPostRepository;
    private final ForumThreadRepository forumThreadRepository;
    private final ForumCategoryRepository forumCategoryRepository;

    public ForumPostService(
            ForumPostRepository forumPostRepository,
            ForumThreadRepository forumThreadRepository,
            ForumCategoryRepository forumCategoryRepository) {
        this.forumPostRepository = forumPostRepository;
        this.forumThreadRepository = forumThreadRepository;
        this.forumCategoryRepository = forumCategoryRepository;
    }

    /**
     * Creates a new post (reply) within the specified thread.
     */
    @Transactional
    public ForumPostDto createPostInThread(String categorySlug, String threadSlug, String content, User author) {
        String trimmedContent = content != null ? content.trim() : "";
        if (trimmedContent.isEmpty()) {
            throw new IllegalArgumentException("Post content may not be empty");
        }

        ForumThread thread = forumThreadRepository
            .findByForumCategory_SlugAndTopicName(categorySlug, threadSlug)
            .orElseThrow(() -> new IllegalArgumentException(
                "Thread not found with slugs: " + categorySlug + "/" + threadSlug));

        Instant now = Instant.now();

        ForumPost newPost = new ForumPost();
        newPost.setContent(trimmedContent);
        newPost.setAuthorName(author.getFirstName() + " " + author.getLastName());
        newPost.setPostedAt(now);
        newPost.setThread(thread);

        ForumPost savedPost = forumPostRepository.save(newPost);

        thread.setLastUpdated(now);
        forumThreadRepository.save(thread);

        ForumCategory category = thread.getForumCategory();
        if (category != null) {
            category.setLastUpdated(now);
            category.setLastAuthor(newPost.getAuthorName());
            forumCategoryRepository.save(category);
        }

        return new ForumPostDto(savedPost);
    }

    /**
     * Retrieves all posts (replies) for a specific thread.
     */
    @Transactional(readOnly = true)
    public List<ForumPostDto> getPostsByThreadSlugs(String categorySlug, String threadSlug) {
        // 🚨 CRITICAL FIX: The repository method name is updated to match the property 'thread' 
        // in your ForumPost entity (findByThread_...)
        List<ForumPost> posts = forumPostRepository
            .findByThread_ForumCategory_SlugAndThread_TopicName(categorySlug, threadSlug);

        return posts.stream()
            .sorted(Comparator.comparing(ForumPost::getPostedAt))
            .map(ForumPostDto::new)
            .collect(Collectors.toList());
    }
}