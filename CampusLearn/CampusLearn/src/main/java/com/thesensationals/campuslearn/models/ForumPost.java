package com.thesensationals.campuslearn.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "forum_posts")
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private Long topicId; // FK to Topic
    private Long authorId; // FK to User
    private String content;
    private Integer upvotes = 0;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters
    public Long getPostId() {
        return postId;
    }
    public Long getTopicId() {
        return topicId;
    }
    public Long getAuthorId() {
        return authorId;
    }
    public String getContent() {
        return content;
    }
    public Integer getUpvotes() {
        return upvotes;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Setters
    public void setPostId(Long postId) {
        this.postId = postId;
    }
    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public void setUpvotes(Integer upvotes) {
        this.upvotes = upvotes;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Constructors
    public ForumPost() {}

    public ForumPost(Long topicId, Long authorId, String content) {
        this.topicId = topicId;
        this.authorId = authorId;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

    // equals, hashCode, toString
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ForumPost that = (ForumPost) o;
        return postId != null && postId.equals(that.postId);
    }

    @Override
    public int hashCode() {
        return postId != null ? postId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "ForumPost{" +
                "postId=" + postId +
                ", topicId=" + topicId +
                ", authorId=" + authorId +
                ", content='" + content + '\'' +
                ", upvotes=" + upvotes +
                ", createdAt=" + createdAt +
                '}';
    }
}
