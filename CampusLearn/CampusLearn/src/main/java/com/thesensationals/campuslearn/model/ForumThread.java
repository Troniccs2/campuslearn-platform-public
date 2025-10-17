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
@Data // Keep @Data for other methods, but explicitly add the missing setter
@NoArgsConstructor
@AllArgsConstructor
public class ForumThread {

    // ... (All existing fields: id, title, slug, authorName, postedAt, lastUpdated, forumCategory)
    // ...

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;
    private String authorName;

    private LocalDateTime postedAt; 
    
    private LocalDateTime lastUpdated;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "category_id", nullable = false)
    private ForumCategory forumCategory;
    
    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ForumPost> posts = new java.util.ArrayList<>();

    // 🛑 MANUAL FIX: Add setter explicitly to resolve 'cannot find symbol' error in Controller 🛑
    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}