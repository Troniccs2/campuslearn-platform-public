package com.thesensationals.campuslearn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// Removed unused import: com.fasterxml.jackson.annotation.JsonManagedReference
// Removed unused import: java.util.List

@Entity
@Table(name = "forum_view") // Maps to the new, dedicated view table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForumThreadView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String title;
    private String slug; 
    private String authorName; 
    private String lastUpdated;
    
    // Link to the ForumCategory table
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private ForumCategory forumCategory;

    // 🛑 REMOVED: The posts collection mapping.
    // It caused the conflict: ForumPost.thread is type ForumThread, not ForumThreadView.
    // Use the primary ForumThread entity to fetch posts.
}