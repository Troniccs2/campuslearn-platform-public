package com.thesensationals.campuslearn.model;

import com.fasterxml.jackson.annotation.JsonManagedReference; 
import jakarta.persistence.*;
import lombok.Data; 
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "forum_thread")
@Data // Generates getters and setters for all fields
@NoArgsConstructor
@AllArgsConstructor
public class ForumThread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;
    private String authorName;

    private LocalDateTime postedAt; 
    
    private LocalDateTime lastUpdated;

    // The essential fix: Defines the relationship needed for the JPQL query
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "category_id", nullable = false)
    private ForumCategory forumCategory;
    
    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ForumPost> posts = new java.util.ArrayList<>();

    // NOTE: The manual setLastUpdated method has been removed 
    // because @Data provides it automatically.
}