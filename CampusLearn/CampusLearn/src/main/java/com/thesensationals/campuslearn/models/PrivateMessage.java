package com.thesensationals.campuslearn.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "private_messages")
public class PrivateMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Tutor tutor;

    @ManyToOne
    private Topic topic;

    private String content;

    private LocalDateTime timestamp = LocalDateTime.now();

    public PrivateMessage() {}

    public PrivateMessage(Student student, Tutor tutor, Topic topic, String content) {
        this.student = student;
        this.tutor = tutor;
        this.topic = topic;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    public Long getMessageId() {
        return messageId;
    }
    public Student getStudent() {
        return student;
    }
    public Tutor getTutor() {
        return tutor;
    }
    public Topic getTopic() {
        return topic;
    }
    public String getContent() {
        return content;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }
    public void setStudent(Student student) {
        this.student = student;
    }
    public void setTutor(Tutor tutor) {
        this.tutor = tutor;
    }
    public void setTopic(Topic topic) {
        this.topic = topic;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void attachMaterial(LearningMaterial material) {
        // Implement logic to attach material
    }

    public void readMessage() {
        // Implement logic to mark as read
    }
}