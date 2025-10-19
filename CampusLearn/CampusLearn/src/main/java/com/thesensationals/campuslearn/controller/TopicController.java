package com.thesensationals.campuslearn.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.dto.TopicRequest;
import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.service.TopicService;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicService topicService;

    // Constructor Injection
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    // 1. GET: /api/topics (Retrieve all topics)
    @GetMapping
    public ResponseEntity<List<TopicResponse>> getAllTopics() {
        List<TopicResponse> topics = topicService.getAllTopics();
        return ResponseEntity.ok(topics);
    }

    // 2. GET: /api/topics/{topicName} (Retrieve a single topic by its name/slug)
    // THIS IS THE MISSING METHOD that was causing the 404/Error redirect.
    @GetMapping("/{topicName}")
    public ResponseEntity<TopicResponse> getTopicByName(@PathVariable String topicName) {
        // Call the service method to fetch the topic
        TopicResponse topic = topicService.getTopicByName(topicName);

        // Handle the case where the topic is not found
        if (topic == null) {
            return ResponseEntity.notFound().build(); // Returns 404 NOT FOUND
        }

        return ResponseEntity.ok(topic); // Returns 200 OK with the topic data
    }

    // 3. POST: /api/topics (Create a new topic)
    @PostMapping
    public ResponseEntity<TopicResponse> createTopic(@RequestBody TopicRequest request) {
        // Implementation note: Ensure createTopic handles user authentication/authorization
        TopicResponse newTopic = topicService.createTopic(request);
        
        return new ResponseEntity<>(newTopic, HttpStatus.CREATED); // Returns 201 CREATED
    }
}