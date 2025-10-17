package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.model.ForumThreadView; // 🚀 CORRECTED: Import the dedicated view entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 🚀 NEW REPOSITORY for the single thread view
@Repository
public interface ForumThreadViewRepository extends JpaRepository<ForumThreadView, Long> { // 🚀 CORRECTED: Use ForumThreadView

    /**
     * Finds a single ForumThreadView (which maps to the new 'forum_view' table).
     */
    // 🚀 CORRECTED: Reference the ForumThreadView entity in the JPQL query
    @Query("SELECT t FROM ForumThreadView t JOIN FETCH t.forumCategory fc WHERE fc.slug = :categorySlug AND t.slug = :threadSlug")
    Optional<ForumThreadView> findThreadBySlugs(@Param("categorySlug") String categorySlug, @Param("threadSlug") String threadSlug); // 🚀 CORRECTED: Return ForumThreadView
}