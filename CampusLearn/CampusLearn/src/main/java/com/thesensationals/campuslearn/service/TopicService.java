package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thesensationals.campuslearn.dto.TopicRequest;
import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.TopicRepository;

// NOTE: You may need to create this custom exception if you don't have one
import com.thesensationals.campuslearn.exception.TopicNotFoundException; 

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final AuthenticationService authenticationService;

    public TopicService(TopicRepository topicRepository, AuthenticationService authenticationService) {
        this.topicRepository = topicRepository;
        this.authenticationService = authenticationService;
    }

    // ----------------------------------------------------------------------
    // 1. Implementation for GET /api/topics
    // ----------------------------------------------------------------------
    @Transactional(readOnly = true)
    public List<TopicResponse> getAllTopics() {
        return topicRepository.findAll().stream()
                .map(TopicResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // ----------------------------------------------------------------------
    // 2. Implementation for GET /api/topics/{topicName}
    // THIS IS THE CRITICAL MISSING METHOD
    // ----------------------------------------------------------------------
    @Transactional(readOnly = true)
    public TopicResponse getTopicByName(String topicName) {
        
        // Find the topic entity by the topicName (which is the slug)
        Topic topic = topicRepository.findByTopicName(topicName)
            .orElseThrow(() -> new TopicNotFoundException("Topic not found with name: " + topicName));
        
        // Map the found entity to the response DTO
        return TopicResponse.fromEntity(topic);
    }
    
    // ----------------------------------------------------------------------
    // 3. Implementation for POST /api/topics
    // ----------------------------------------------------------------------
    @Transactional
    public TopicResponse createTopic(TopicRequest request) {
        Topic topic = mapFromDtoToTopic(request);
        Topic savedTopic = saveTopic(topic);
        return TopicResponse.fromEntity(savedTopic);
    }

    @Transactional
    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    private Topic mapFromDtoToTopic(TopicRequest request) {
        User currentUser = authenticationService.getCurrentUser();
        
        Topic topic = new Topic();
        
        topic.setTitle(request.getTitle());
        // Auto-generate the slug (topicName) from the title
        topic.setTopicName(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        topic.setContent(request.getContent());
        
        topic.setAuthor(currentUser); 
        topic.setLastUpdated(LocalDateTime.now());
        
        return topic;
    }
}