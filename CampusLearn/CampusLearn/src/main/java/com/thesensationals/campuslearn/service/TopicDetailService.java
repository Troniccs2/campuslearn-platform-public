package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.dto.ResponseDTO;
import com.thesensationals.campuslearn.model.Response;
import com.thesensationals.campuslearn.model.ForumThread; 
import com.thesensationals.campuslearn.repository.ResponseRepository;
import com.thesensationals.campuslearn.repository.ForumThreadRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List; 
import java.util.NoSuchElementException; 
import java.util.stream.Collectors;

@Service 
public class TopicDetailService {

    private final ForumThreadRepository forumThreadRepository;
    private final ResponseRepository responseRepository;
    
    // Constructor Injection
    public TopicDetailService(ForumThreadRepository forumThreadRepository, ResponseRepository responseRepository) {
        this.forumThreadRepository = forumThreadRepository;
        this.responseRepository = responseRepository;
    }

    @Transactional
    public Response createResponse(Long topicId, Response newResponse) {
        // 1. Find the parent topic
        ForumThread topic = forumThreadRepository.findById(topicId)
            .orElseThrow(() -> new NoSuchElementException("Topic not found with ID: " + topicId));
            
        // 2. Link the response to the topic
        newResponse.setForumThread(topic); 
        
        // 3. Save to the PostgreSQL database
        return responseRepository.save(newResponse);
    }
    
    @Transactional(readOnly = true)
    public List<ResponseDTO> getResponsesForTopic(Long topicId) {
        // Correctly calls the method defined in ResponseRepository
        List<Response> responses = responseRepository.findByForumThreadId(topicId); 
        
        // Convert Entities to DTOs
        return responses.stream()
                .map(ResponseDTO::fromEntity) 
                .collect(Collectors.toList()); 
    }
}