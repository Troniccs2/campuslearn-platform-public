package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.model.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// This interface allows Spring to automatically manage CRUD operations
// for the ForumPost entity using the Long primary key.
@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    
    // You don't need any custom methods here, 
    // JpaRepository provides .save() and .findById() which we need.
    
}