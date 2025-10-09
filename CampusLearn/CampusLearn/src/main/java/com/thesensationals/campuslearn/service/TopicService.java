package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.Topic;
import com.thesensationals.campuslearn.repository.TopicRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    private TopicRepository topicRepository;

    public Topic createTopic(Topic topic) {
        return null;
    }

    public Optional<Topic> findTopicById(Long id) {
        return Optional.empty();
    }

    public List<Topic> findAllTopics() {
        return null;
    }

    public void deleteTopic(Long id) {
    }
}