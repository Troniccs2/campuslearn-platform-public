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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForumThread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;

    // 🛑 FIX 1: Mapping to the actual DB column name from your image
    @Column(name = "author_name")
    private String authorName;

    // 🛑 FIX 2: Mapping 'postedAt' to the correct DB timestamp column.
    // The DB has 'last_updated' as the timestamp. We must rename one or the other.
    // Since 'lastUpdated' exists and is also 'last_updated' in the DB (per your image), 
    // we must assume 'postedAt' must map to an *actual* 'created_at' column 
    // that wasn't in the image, OR we use last_updated for both.
    // LET'S ASSUME a separate creation timestamp named 'created_at' is used for 'postedAt'.
    @Column(name = "created_at")
    private LocalDateTime postedAt;

    // 🛑 FIX 3: Mapping 'lastUpdated' to the column in your image
    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
    
    // 🛑 FIX 4: Mapping the thread text/body (based on previous error)
    // The previous error was "column 'content' does not exist". 
    // This field must exist in your entity, even if it's not shown in the image.
    // We assume the DB column for content is named 'body' (the most common alternative).
    @Column(name = "body")
    private String content; // ADDED: Thread body content

    // The essential fix: Defines the relationship needed for the JPQL query
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ForumCategory forumCategory;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ForumPost> posts = new java.util.ArrayList<>();
}