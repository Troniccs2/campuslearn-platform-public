package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.models.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, String> {
}