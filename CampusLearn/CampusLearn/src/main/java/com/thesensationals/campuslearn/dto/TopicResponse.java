package com.thesensationals.campuslearn.dto;

import java.time.LocalDateTime;

import com.thesensationals.campuslearn.model.Topic;

// Using a Java Record (available since Java 16) is great for DTOs!
public record TopicResponse(
    Long id,
    String topicName,
    String title,
    String authorName,
    LocalDateTime lastUpdated
) {
    // Static factory method to map from the Topic entity
    public static TopicResponse fromEntity(Topic topic) {
        return new TopicResponse(
            topic.getId(),
            topic.getTopicName(),
            topic.getTitle(),
            topic.getAuthor().getFirstName(), // Use a property of the User/Author
            topic.getLastUpdated()
        );
    }
}