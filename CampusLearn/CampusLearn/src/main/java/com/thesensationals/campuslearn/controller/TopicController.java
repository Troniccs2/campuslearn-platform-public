package com.thesensationals.campuslearn.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.dto.TopicRequest; // This will now resolve
import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.service.TopicService;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getAllTopics() {
        List<TopicResponse> topics = topicService.getAllTopics();
        return ResponseEntity.ok(topics);
    }

    @PostMapping
    public ResponseEntity<TopicResponse> createTopic(@RequestBody TopicRequest request) {
        // You will need to implement topicService.createTopic(request)
        TopicResponse newTopic = topicService.createTopic(request);
        
        return new ResponseEntity<>(newTopic, HttpStatus.CREATED);
    }
}