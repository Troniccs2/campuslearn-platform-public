package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional; // ADDED: Import Optional
import java.util.Set; // ADDED: Import Set

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.thesensationals.campuslearn.dto.TopicRequest;
import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.model.Role; // ADDED: For student filtering
import com.thesensationals.campuslearn.model.Topic;
import com.thesensationals.campuslearn.model.User;
import com.thesensationals.campuslearn.repository.TopicRepository;
import com.thesensationals.campuslearn.repository.UserRepository;

import com.thesensationals.campuslearn.exception.TopicNotFoundException; 

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public TopicService(
        TopicRepository topicRepository, 
        AuthenticationService authenticationService,
        UserRepository userRepository
    ) {
        this.topicRepository = topicRepository;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    // --- Existing methods omitted for brevity (getAllTopics, getTopicByName) ---
    @Transactional(readOnly = true)
    public List<TopicResponse> getAllTopics() { /* ... */ return topicRepository.findAll().stream().map(TopicResponse::fromEntity).collect(Collectors.toList()); }
    @Transactional(readOnly = true)
    public TopicResponse getTopicByName(String topicName) { 
         Topic topic = topicRepository.findByTopicName(topicName).orElseThrow(() -> new TopicNotFoundException("Topic not found with name: " + topicName));
         return TopicResponse.fromEntity(topic);
    }
    
    // ----------------------------------------------------------------------
    // 3. Implementation for POST /api/topics (MODIFIED TO HANDLE ENROLLMENT)
    // ----------------------------------------------------------------------
    @Transactional
    public TopicResponse createTopic(TopicRequest request) {
        
        // 1. Map DTO to Topic Entity
        Topic topic = mapFromDtoToTopic(request);
        
        // 2. 🚨 NEW: Add students to the Topic before saving
        if (request.getStudentIds() != null && !request.getStudentIds().isEmpty()) {
            addStudentsToTopic(topic, request.getStudentIds());
        }
        
        // 3. Save the Topic (which now includes the enrolled students)
        Topic savedTopic = saveTopic(topic);
        
        return TopicResponse.fromEntity(savedTopic);
    }

    @Transactional
    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    // ⬇️ MODIFIED: Helper method to map DTO data ⬇️
    private Topic mapFromDtoToTopic(TopicRequest request) {
        User currentUser = authenticationService.getCurrentUser();
        
        Topic topic = new Topic();
        
        topic.setTitle(request.getTitle());
        // Auto-generate the slug (topicName) from the title
        topic.setTopicName(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        topic.setContent(request.getContent());
        
        topic.setAuthor(currentUser); 
        topic.setLastUpdated(LocalDateTime.now());
        
        return topic;
    }
    
    // ⬇️ NEW: Private method to handle student lookup and assignment ⬇️
    private void addStudentsToTopic(Topic topic, List<Long> studentIds) {
        // 1. Find the Students
        List<User> studentsToEnroll = userRepository.findAllById(studentIds);
        
        // 2. Safety check: Filter to ensure only users with the STUDENT role are added
        Set<User> filteredStudents = studentsToEnroll.stream()
            .filter(user -> user.getRole() == Role.STUDENT)
            .collect(Collectors.toSet());
        
        // 3. Assign the filtered students to the topic
        topic.setEnrolledStudents(filteredStudents);
    }
    
    // ----------------------------------------------------------------------
    // 4. Enrollment Logic (RETAINED, as it's useful for updates)
    // ----------------------------------------------------------------------
    @Transactional
    public Topic enrollStudents(Long topicId, List<Long> studentIds) {
        Topic topic = topicRepository.findById(topicId)
            .orElseThrow(() -> new TopicNotFoundException("Topic not found with ID: " + topicId));
        
        // The rest of the enrollment logic is now delegated to the helper
        addStudentsToTopic(topic, studentIds);

        return topicRepository.save(topic);
    }
    
    // ----------------------------------------------------------------------
    // 5. Fetch all students for the tutor's UI (RETAINED/CONFIRMED)
    // ----------------------------------------------------------------------
    @Transactional(readOnly = true)
    public List<User> findAllStudents() {
        return userRepository.findAllByRole(Role.STUDENT);
    }
}