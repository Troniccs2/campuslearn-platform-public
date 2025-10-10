package com.thesensationals.campuslearn.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "tutors")
// Links the tutor's primary key to the user's primary key
@PrimaryKeyJoinColumn(name = "tutor_id")
public class Tutor extends User {

    @Column(unique = true)
    private String employee_code;

    private Boolean approved = false;

    // Getters
    public String getEmployee_code() {
        return employee_code;
    }

    public Boolean getApproved() {
        return approved;
    }

    // Setters
    public void setEmployee_code(String employee_code) {
        this.employee_code = employee_code;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
}
