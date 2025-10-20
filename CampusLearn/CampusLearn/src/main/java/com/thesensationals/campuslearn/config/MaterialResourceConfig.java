package com.thesensationals.campuslearn.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MaterialResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapped URL: /files/**
        // Local Directory: The absolute path of your uploads/learning_materials folder
        registry.addResourceHandler("/files/**")
                // Use "file:" prefix and end with a slash "/"
                .addResourceLocations("file:uploads/learning_materials/");
    }
}