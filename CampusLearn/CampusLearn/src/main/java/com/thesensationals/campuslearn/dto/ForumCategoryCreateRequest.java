package com.thesensationals.campuslearn.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ForumCategoryCreateRequest {

    @NotBlank(message = "Category name is required")
    @Size(max = 120, message = "Category name must be 120 characters or fewer")
    private String name;

    @Size(max = 600, message = "Description must be 600 characters or fewer")
    private String description;

    public ForumCategoryCreateRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
