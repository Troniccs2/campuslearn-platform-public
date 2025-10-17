package com.thesensationals.campuslearn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thesensationals.campuslearn.model.ForumCategory;

public interface ForumCategoryRepository extends JpaRepository<ForumCategory, Long> {
    // Custom query method to find a category by its slug (for friendly URLs)
    Optional<ForumCategory> findBySlug(String slug);
}