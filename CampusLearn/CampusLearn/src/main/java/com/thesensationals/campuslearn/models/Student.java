package com.thesensationals.campuslearn.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@Table(name = "students")
// Links the student's primary key to the user's primary key
@PrimaryKeyJoinColumn(name = "student_id")
public class Student extends User {

    @Column(unique = true, nullable = false)
    private String student_number;

    private String academic_level;
    private String bio;

    // Getters
    public String getStudent_number() {
        return student_number;
    }

    public String getAcademic_level() {
        return academic_level;
    }

    public String getBio() {
        return bio;
    }

    // Setters
    public void setStudent_number(String student_number) {
        this.student_number = student_number;
    }

    public void setAcademic_level(String academic_level) {
        this.academic_level = academic_level;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
