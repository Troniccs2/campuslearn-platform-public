package com.thesensationals.campuslearn.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

// --- Lombok Annotations ---
import lombok.Getter;           // Automatically creates all getter methods
import lombok.Setter;           // Automatically creates all setter methods
import lombok.NoArgsConstructor;  // Creates a constructor with no arguments
import lombok.AllArgsConstructor; // Creates a constructor with all arguments

@Entity
@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForumCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // e.g., "Workshops"
    private String slug;        // e.g., "workshops"
    private String lastAuthor;
    private String lastUpdated;

    // The getters, setters, and constructors are now automatically generated 
    // by Lombok, so you don't need the manual boilerplate code here.
}