package com.thesensationals.campuslearn.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thesensationals.campuslearn.models.Topic;
import com.thesensationals.campuslearn.repository.TopicRepository;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    // Method names that match what TopicsController is calling
    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }

    // Keep your original method names too if needed elsewhere
    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public Optional<Topic> findTopicById(Long id) {
        return topicRepository.findById(id);
    }

    public List<Topic> findAllTopics() {
        return topicRepository.findAll();
    }
}