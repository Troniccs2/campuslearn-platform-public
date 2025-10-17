package com.thesensationals.campuslearn.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForumThread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    // We'll use a String for simplicity now, but later this should be a relationship
    private String slug; // Used for the URL (e.g., sen381-thread)
    private String authorName; 
    private String lastUpdated;
    
    // Link the thread back to its parent category
    // 🚀 FIX: Changed to EAGER fetch to resolve the Jackson serialization crash (InvalidDefinitionException: No serializer found for class org.hibernate.proxy...)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private ForumCategory forumCategory; 
}