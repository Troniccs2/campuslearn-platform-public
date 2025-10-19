package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.model.Response;
import com.thesensationals.campuslearn.dto.ResponseDTO; 
import com.thesensationals.campuslearn.service.TopicDetailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/topics/{topicId}/responses")
public class TopicDetailController {

    private final TopicDetailService topicDetailService;

    // Constructor Injection
    public TopicDetailController(TopicDetailService topicDetailService) {
        this.topicDetailService = topicDetailService;
    }

    // HTTP GET: Retrieve all responses for a specific topic
    @GetMapping
    public ResponseEntity<List<ResponseDTO>> getResponsesForTopic(@PathVariable Long topicId) {
        List<ResponseDTO> responses = topicDetailService.getResponsesForTopic(topicId); 
        return ResponseEntity.ok(responses);
    }
    
    // HTTP POST: Create a new response for a specific topic
    @PostMapping 
    public ResponseEntity<ResponseDTO> createTopicResponse(
        @PathVariable Long topicId, 
        @RequestBody Response newResponse
    ) {
        Response createdResponse = topicDetailService.createResponse(topicId, newResponse); 
        
        // Return the DTO of the newly created response with a 201 Created status
        return new ResponseEntity<>(ResponseDTO.fromEntity(createdResponse), HttpStatus.CREATED);
    }
}