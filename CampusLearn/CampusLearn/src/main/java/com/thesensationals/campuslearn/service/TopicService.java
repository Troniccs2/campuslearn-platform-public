package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.repository.TopicRepository;

@Service
public class TopicService {

    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Transactional(readOnly = true)
    public List<TopicResponse> getAllTopics() {
        // Fetch all Topics and map them to the TopicResponse DTO
        return topicRepository.findAll().stream()
                .map(TopicResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // A placeholder for saving a topic (you will expand this later)
    @Transactional
    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }
}