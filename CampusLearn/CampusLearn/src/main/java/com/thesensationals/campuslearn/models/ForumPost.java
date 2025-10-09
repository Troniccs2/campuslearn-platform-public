package com.thesensationals.campuslearn.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "forum_posts")
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    private Long topic_id; // FK to Topic
    private Long author_id; // FK to User
    private String content;
    private Integer upvotes = 0;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime created_at = LocalDateTime.now();

    // Getters
    public Long getPost_id() {
        return post_id;
    }

    public Long getTopic_id() {
        return topic_id;
    }

    public Long getAuthor_id() {
        return author_id;
    }

    public String getContent() {
        return content;
    }

    public Integer getUpvotes() {
        return upvotes;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    // Setters
    public void setPost_id(Long post_id) {
        this.post_id = post_id;
    }

    public void setTopic_id(Long topic_id) {
        this.topic_id = topic_id;
    }

    public void setAuthor_id(Long author_id) {
        this.author_id = author_id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUpvotes(Integer upvotes) {
        this.upvotes = upvotes;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
