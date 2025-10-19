package com.thesensationals.campuslearn.model;

import jakarta.persistence.Column; // 🛑 Import needed for the fix
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
// Removed unused import: java.util.List
// NOTE: LocalDateTime import is missing but needed for timestamp fields

@Entity
@Table(name = "forum_view")
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

    // This is fine as the names match (authorName vs. author_name) due to convention.
    private String authorName;

    // 🛑 FIX: The column name is 'last_updated' in the database.
    @Column(name = "last_updated")
    private String lastUpdated;

    // 🛑 FIX 1: ADDED - Thread Content/Body field (previously caused "content" missing error)
    // Assuming the database column is named 'body' (replace with 'text' or 'thread_text' if this fails)
    @Column(name = "body") 
    private String content;
    
    // 🛑 FIX 2: ADDED - Thread Creation Time (previously caused "posted_at" missing error)
    // Assuming the database has a creation timestamp column named 'created_at'.
    // NOTE: You may need to change the type from String to LocalDateTime/Instant.
    @Column(name = "created_at")
    private String postedAt; 

    // Link to the ForumCategory table
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private ForumCategory forumCategory;

    // REMOVED: The posts collection mapping - Correctly omitted for a view entity.
}