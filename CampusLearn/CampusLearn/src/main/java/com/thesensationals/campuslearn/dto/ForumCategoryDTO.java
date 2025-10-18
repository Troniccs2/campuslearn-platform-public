package com.thesensationals.campuslearn.dto;

// We will rely on the manually defined constructors below
// import lombok.AllArgsConstructor; // REMOVE or COMMENT OUT
// import lombok.NoArgsConstructor;  // REMOVE or COMMENT OUT
import lombok.Getter;
import lombok.Setter;

// @Getter and @Setter are kept because your service needs the setter methods (dto.setX())
@Getter
@Setter
public class ForumCategoryDTO {

    private Long id;
    private String name;
    private String slug;
    private String lastAuthor;
    private Long lastUpdated;

    // FIX 1: MANUAL No-Argument Constructor (Required for Spring/Jackson and set-based conversion)
    public ForumCategoryDTO() {
    }

    // FIX 2: MANUAL All-Argument Constructor (Required by ForumService.convertToDto logic)
    public ForumCategoryDTO(Long id, String name, String slug, String lastAuthor, Long lastUpdated) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.lastAuthor = lastAuthor;
        this.lastUpdated = lastUpdated;
    }
}