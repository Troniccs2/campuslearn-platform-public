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
    
    // 🛑 QUICK FIX: Native SQL Query to bypass Hibernate's confusion.
    // We are assuming your database view is named 'forum_view'
    @Query(
        value = "SELECT * FROM forum_view WHERE slug = :categorySlug", 
        nativeQuery = true
    )
    List<ForumThread> findThreadsByCategorySlugNative(@Param("categorySlug") String categorySlug); 

    // NOTE: I'm keeping your original JPQL query, just renaming it for clarity,
    // as the Native Query is the one we will now use in the service.
    @Query("SELECT t FROM ForumThread t JOIN t.forumCategory c WHERE c.slug = :categorySlug")
    List<ForumThread> findThreadsByCategorySlugJPQL(@Param("categorySlug") String categorySlug); 
    
    // 3. The method for a single thread view (Kept as is, assuming it works)
    Optional<ForumThread> findByForumCategorySlugAndSlug(String categorySlug, String threadSlug);

    // ⛔ Removed the problematic convention method: List<ForumThread> findByForumCategorySlug(String categorySlug);
}