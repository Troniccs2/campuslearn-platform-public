package com.thesensationals.campuslearn.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data; 
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "forum_post")
@Data // Keep @Data for other methods, but explicitly add the missing setters
@NoArgsConstructor
@AllArgsConstructor
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "thread_id", nullable = false) 
    @JsonBackReference
    private ForumThread thread; 

    private String authorName;

    private LocalDateTime postedAt;

    // 🛑 MANUAL FIX: Add setters explicitly to resolve 'cannot find symbol' errors in Controller 🛑
    public void setThread(ForumThread thread) {
        this.thread = thread;
    }
    
    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public void setPostedAt(LocalDateTime postedAt) {
        this.postedAt = postedAt;
    }
}