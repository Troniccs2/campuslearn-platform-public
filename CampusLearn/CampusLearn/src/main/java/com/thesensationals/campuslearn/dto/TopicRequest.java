package com.thesensationals.campuslearn.dto;

import java.util.List; // ADDED: Import List

public class TopicRequest {

    private String title;
    private String content;
    private List<Long> studentIds; // ⬅️ NEW FIELD: List of selected student IDs

    public TopicRequest() {
    }

    public TopicRequest(String title, String content, List<Long> studentIds) { // CONSTRUCTOR UPDATED
        this.title = title;
        this.content = content;
        this.studentIds = studentIds; // Initialize new field
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // ⬇️ NEW GETTER AND SETTER ⬇️
    public List<Long> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(List<Long> studentIds) {
        this.studentIds = studentIds;
    }
}