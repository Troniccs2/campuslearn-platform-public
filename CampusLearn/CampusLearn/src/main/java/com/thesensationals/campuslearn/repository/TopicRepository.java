package com.thesensationals.campuslearn.repository;

import java.util.List;
import java.util.Optional; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User; // ADDED: Import User model

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    // Example of a custom finder method:
    List<Topic> findByTopicNameContainingIgnoreCase(String name);

    // CRITICAL FIX: Use JOIN FETCH to eagerly load the 'author' relationship (t.author).
    @Query("SELECT t FROM Topic t JOIN FETCH t.author WHERE t.topicName = :topicName")
    Optional<Topic> findByTopicName(String topicName);

    // 💡 NEW CRITICAL METHOD: Filter topics by an enrolled student
    // Spring Data JPA uses the ManyToMany relationship (enrolledStudents) 
    // to build the correct SQL query against the topic_students table.
    @Query("SELECT t FROM Topic t JOIN t.enrolledStudents student WHERE student = :user")
    List<Topic> findAllByEnrolledStudent(User user);
}