package com.thesensationals.campuslearn.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.service.TopicService;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    /**
     * Endpoint to list all topics for the TopicsPage component.
     * Accessible by ALL authenticated users.
     * GET /api/topics
     */
    @GetMapping
    public ResponseEntity<List<TopicResponse>> getAllTopics() {
        List<TopicResponse> topics = topicService.getAllTopics();
        return ResponseEntity.ok(topics);
    }

    // TODO: You will add a @PostMapping here later for creating a new topic.
}