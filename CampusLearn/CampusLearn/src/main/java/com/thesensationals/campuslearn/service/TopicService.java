package com.thesensationals.campuslearn.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.Set;
import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException; // ADDED: For security-related access issues
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.thesensationals.campuslearn.dto.TopicRequest;
import com.thesensationals.campuslearn.dto.TopicResponse;
import com.thesensationals.campuslearn.model.Role;
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

    // ----------------------------------------------------------------------
    // 1. GET ALL TOPICS (FIXED: Safely handles Optional<User>)
    // ----------------------------------------------------------------------
    @Transactional(readOnly = true)
    public List<TopicResponse> getAllTopics() { 
        // FIX: Change type to Optional and use orElse to handle unauthenticated state
        Optional<User> currentUserOptional = authenticationService.getCurrentUser();
        
        if (currentUserOptional.isEmpty()) {
            // Unauthenticated users see nothing
            return Collections.emptyList();
        }

        User currentUser = currentUserOptional.get();
        List<Topic> topics;

        if (currentUser.getRole() == Role.TUTOR) {
            // Tutor sees all topics
            topics = topicRepository.findAll(); 
            
        } else if (currentUser.getRole() == Role.STUDENT) {
            // Student ONLY sees topics they are explicitly enrolled in
            topics = topicRepository.findAllByEnrolledStudent(currentUser); 
            
        } else {
            // Other roles/unhandled roles see nothing
            topics = Collections.emptyList();
        }

        // Map the filtered list to the DTO response
        return topics.stream()
            .map(TopicResponse::fromEntity)
            .collect(Collectors.toList()); 
    }

    // ----------------------------------------------------------------------
    // 2. GET TOPIC BY NAME (FIXED: Safely handles Optional<User>)
    // ----------------------------------------------------------------------
    @Transactional(readOnly = true)
    public TopicResponse getTopicByName(String topicName) { 
        Topic topic = topicRepository.findByTopicName(topicName)
            .orElseThrow(() -> new TopicNotFoundException("Topic not found with name: " + topicName));
        
        // FIX: Change type to Optional<User>
        Optional<User> currentUserOptional = authenticationService.getCurrentUser();

        // The security config allows anyone (authenticated or not) to access the topic.
        // We only need to check the FORBIDDEN case for students who are not enrolled.
        if (currentUserOptional.isPresent()) {
            User currentUser = currentUserOptional.get();

            // Enforce access control for single topic retrieval for Students
            // If user is a STUDENT AND they are NOT enrolled in this topic, deny access.
            if (currentUser.getRole() == Role.STUDENT && !topic.getEnrolledStudents().contains(currentUser)) {
                 throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied. You are not enrolled in this topic.");
            }
        }
        // If the user is unauthenticated (anonymous) OR if they are an ADMIN/TUTOR, access is granted here.
        
        return TopicResponse.fromEntity(topic);
    }
    
    // ----------------------------------------------------------------------
    // 3. CREATE TOPIC (FIXED: Safely handles Optional<User>)
    // ----------------------------------------------------------------------
    @Transactional
    public TopicResponse createTopic(TopicRequest request) {
        
        // FIX: mapFromDtoToTopic now handles the Optional for the current user
        Topic topic = mapFromDtoToTopic(request);
        
        // 2. Check if the generated slug already exists
        if (topicRepository.findByTopicName(topic.getTopicName()).isPresent()) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT, 
                "Topic title creates a duplicate slug: '" + topic.getTopicName() + "'"
            );
        }
        
        // 3. Add students to the Topic before saving
        if (request.getStudentIds() != null && !request.getStudentIds().isEmpty()) {
            addStudentsToTopic(topic, request.getStudentIds());
        }
        
        // 4. Save the Topic
        Topic savedTopic = topicRepository.save(topic); 
        
        return TopicResponse.fromEntity(savedTopic);
    }

    // ----------------------------------------------------------------------
    // 4. ENROLL STUDENTS (Useful for updates/bulk enrollment)
    // ----------------------------------------------------------------------
    @Transactional
    public Topic enrollStudents(Long topicId, List<Long> studentIds) {
        Topic topic = topicRepository.findById(topicId)
            .orElseThrow(() -> new TopicNotFoundException("Topic not found with ID: " + topicId));
        
        addStudentsToTopic(topic, studentIds);

        return topicRepository.save(topic);
    }
    
    // ----------------------------------------------------------------------
    // 5. FETCH ALL STUDENTS (For tutor's UI selection)
    // ----------------------------------------------------------------------
    @Transactional(readOnly = true)
    public List<User> findAllStudents() {
        return userRepository.findAllByRole(Role.STUDENT);
    }

    // ----------------------------------------------------------------------
    // 6. HELPER METHODS (FIXED: Safely handles Optional<User>)
    // ----------------------------------------------------------------------

    private Topic mapFromDtoToTopic(TopicRequest request) {
        // FIX: Get the User or throw an AccessDeniedException (since only Tutors/Admins can create topics)
        User currentUser = authenticationService.getCurrentUser()
            .orElseThrow(() -> new AccessDeniedException("User must be authenticated to create a topic.")); 
        
        Topic topic = new Topic();
        
        topic.setTitle(request.getTitle());
        // Auto-generate the slug (topicName) from the title
        topic.setTopicName(request.getTitle().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        topic.setContent(request.getContent());
        
        topic.setAuthor(currentUser); 
        topic.setLastUpdated(LocalDateTime.now());
        
        return topic;
    }
    
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
}