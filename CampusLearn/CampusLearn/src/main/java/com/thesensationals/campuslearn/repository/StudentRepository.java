package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByEmail(String email);
    Optional<Student> findByStudentNumber(String studentNumber);
}