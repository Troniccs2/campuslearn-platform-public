package com.thesensationals.campuslearn.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.PrimaryKeyJoinColumn;

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
        this.employee_code = employee;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
}
