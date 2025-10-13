package com.thesensationals.campuslearn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.thesensationals.campuslearn.models.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    @Query("SELECT s FROM Student s WHERE s.student_number = :studentNumber")
    Optional<Student> findByStudentNumber(@Param("studentNumber") String studentNumber);
}