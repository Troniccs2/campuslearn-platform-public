package com.thesensationals.campuslearn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.model.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    // We get findAll(), findById(), save(), etc., for free from JpaRepository.
    // We can add custom finder methods here if needed, but findAll() is enough for now.

    // Example of a custom finder method:
    List<Topic> findByTopicNameContainingIgnoreCase(String name);
}