package com.thesensationals.campuslearn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.ForumThread;

@Repository
public interface ForumThreadRepository extends JpaRepository<ForumThread, Long> {
    
    // 🚀 THE FIX: Changed to match the entity relationship path
    // findBy [ForumCategory object in ForumThread] _ [Slug field in ForumCategory]
    List<ForumThread> findByForumCategory_Slug(String categorySlug); 
}