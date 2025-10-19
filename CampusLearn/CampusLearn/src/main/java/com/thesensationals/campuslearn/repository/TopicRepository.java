package com.thesensationals.campuslearn.repository;

import java.util.List;
import java.util.Optional; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // 👈 New Import
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    // Example of a custom finder method:
    List<Topic> findByTopicNameContainingIgnoreCase(String name);

    // CRITICAL FIX: Use JOIN FETCH to eagerly load the 'author' relationship (t.author).
    // This prevents a LazyInitializationException when mapping to the TopicResponse DTO.
    @Query("SELECT t FROM Topic t JOIN FETCH t.author WHERE t.topicName = :topicName")
    Optional<Topic> findByTopicName(String topicName);
}