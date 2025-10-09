package com.thesensationals.campuslearn.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@Table(name = "admins")
// Links the admin's primary key to the user's primary key
@PrimaryKeyJoinColumn(name = "admin_id")
public class Admin extends User {

    @Column(unique = true)
    private String employee_id;

    // Getters
    public String getEmployee_id() {
        return employee_id;
    }

    // Setters
    public void setEmployee_id(String employee_id) {
        this.employee_id = employee_id;
    }
}
