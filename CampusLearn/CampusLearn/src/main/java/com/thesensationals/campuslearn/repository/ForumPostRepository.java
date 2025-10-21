package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.model.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // REQUIRED IMPORT

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    List<ForumPost> findByThread_ForumCategory_SlugAndThread_TopicName(String categorySlug, String threadSlug);
}