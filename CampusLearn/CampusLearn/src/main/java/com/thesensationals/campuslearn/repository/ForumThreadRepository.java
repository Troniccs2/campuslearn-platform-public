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

    // 3. Finds Thread by Category's slug AND Thread's topicName.
    Optional<ForumThread> findByForumCategory_SlugAndTopicName(String categorySlug, String threadSlug);
}