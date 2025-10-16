package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thesensationals.campuslearn.dto.TopicRequest;
import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User; // Required to set the Author
import com.thesensationals.campuslearn.repository.TopicRepository;

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final AuthenticationService authenticationService; // 1. Inject the service

    // 2. Add AuthenticationService to the constructor
    public TopicService(TopicRepository topicRepository, AuthenticationService authenticationService) {
        this.topicRepository = topicRepository;
        this.authenticationService = authenticationService;
    }

    @Transactional(readOnly = true)
    public List<TopicResponse> getAllTopics() {
        return topicRepository.findAll().stream()
                .map(TopicResponse::fromEntity)
                .collect(Collectors.toList());
    }

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
        // 3. Get the current authenticated user
        User currentUser = authenticationService.getCurrentUser();
        
        Topic topic = new Topic();
        
        topic.setTitle(request.getTitle());
        topic.setTopicName(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        topic.setContent(request.getContent());
        
        // 4. CRITICAL FIX: Set the current user as the author
        topic.setAuthor(currentUser); 
        
        topic.setLastUpdated(LocalDateTime.now());
        
        return topic;
    }
}