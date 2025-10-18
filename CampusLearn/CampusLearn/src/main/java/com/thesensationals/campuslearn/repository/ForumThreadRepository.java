package com.thesensationals.campuslearn.repository;

import java.util.List;
import java.util.Optional; // <-- FIX: ADDED THIS IMPORT
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // <-- FIX: ADDED THIS IMPORT
import org.springframework.data.repository.query.Param; // <-- FIX: ADDED THIS IMPORT
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.ForumThread;

@Repository
public interface ForumThreadRepository extends JpaRepository<ForumThread, Long> {
    
    // 1. The explicit JPQL query (Good for list)
    @Query("SELECT t FROM ForumThread t JOIN t.forumCategory c WHERE c.slug = :categorySlug")
    List<ForumThread> findThreadsByCategorySlug(@Param("categorySlug") String categorySlug); 

    // 2. The clean, convention-based list method (Best practice)
    List<ForumThread> findByForumCategorySlug(String categorySlug);

    // 3. The method for a single thread view (Important to have)
    Optional<ForumThread> findByForumCategorySlugAndSlug(String categorySlug, String threadSlug);
}