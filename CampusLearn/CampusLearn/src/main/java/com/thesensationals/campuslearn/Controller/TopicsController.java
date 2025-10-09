package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.models.Topic;
import com.thesensationals.campuslearn.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private TopicService topicService;

    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        return null;
    }

    public ResponseEntity<Topic> getTopicById(@PathVariable Long id) {
        return null;
    }

    public List<Topic> getAllTopics() {
        return null;
    }

    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        return null;
    }
}