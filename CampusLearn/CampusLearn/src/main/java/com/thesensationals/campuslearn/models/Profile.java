package com.thesensationals.campuslearn.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class Profile {
    private String bio;
    private String academicBackground;
    private String contactPreferences;

    public Profile() {}

    public Profile(String bio, String academicBackground, String contactPreferences) {
        this.bio = bio;
        this.academicBackground = academicBackground;
        this.contactPreferences = contactPreferences;
    }

    public void updateProfileDetails(String bio, String academicBackground) {
        this.bio = bio;
        this.academicBackground = academicBackground;
    }

    // Getters and setters
    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAcademicBackground() {
        return academicBackground;
    }

    public void setAcademicBackground(String academicBackground) {
        this.academicBackground = academicBackground;
    }

    public String getContactPreferences() {
        return contactPreferences;
    }

    public void setContactPreferences(String contactPreferences) {
        this.contactPreferences = contactPreferences;
    }
}