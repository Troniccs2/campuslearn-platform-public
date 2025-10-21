package com.thesensationals.campuslearn.repository;

import java.util.List;
import java.util.Optional; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; 
import org.springframework.data.repository.query.Param; 
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.ForumThread;

@Repository
public interface ForumThreadRepository extends JpaRepository<ForumThread, Long> {
    
    // 1. Method for TopicDetailService (Find by Topic's own slug)
    Optional<ForumThread> findByTopicName(String topicName);

    // 2. FIX: Uses the correct JPA naming convention to avoid the native query issues
    List<ForumThread> findByForumCategory_Slug(String categorySlug);

    // 3. Original method (kept for other usages, but likely not the one being called for the full view)
    Optional<ForumThread> findByForumCategory_SlugAndTopicName(String categorySlug, String threadSlug);

    // 🛑 CRITICAL FIX: Custom query to fetch the thread EAGERLY along with its posts.
    @Query("SELECT t FROM ForumThread t " +
           "JOIN FETCH t.forumCategory c " +
           "LEFT JOIN FETCH t.posts p " +
           "WHERE c.slug = :categorySlug AND t.topicName = :threadSlug " +
           "ORDER BY p.postedAt ASC") // Ensure posts are sorted
    Optional<ForumThread> findThreadViewBySlugsWithPosts(
        @Param("categorySlug") String categorySlug, 
        @Param("threadSlug") String threadSlug);
}