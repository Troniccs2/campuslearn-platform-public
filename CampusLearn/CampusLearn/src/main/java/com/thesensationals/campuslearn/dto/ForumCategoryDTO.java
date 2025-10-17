// src/main/java/com/thesensationals/campuslearn/dto/ForumCategoryDTO.java

package com.thesensationals.campuslearn.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok annotations to automatically generate methods:
@Getter
@Setter
@NoArgsConstructor // Needed for Jackson serialization/deserialization
@AllArgsConstructor // <-- CRITICAL FIX: Generates the constructor required by ForumService
public class ForumCategoryDTO {

    private Long id;
    private String name;
    private String slug;
    private String lastAuthor;
    private Long lastUpdated;

    // NOTE: Lombok will generate the required constructor with all 5 fields
    // You do not need to write it manually.
}