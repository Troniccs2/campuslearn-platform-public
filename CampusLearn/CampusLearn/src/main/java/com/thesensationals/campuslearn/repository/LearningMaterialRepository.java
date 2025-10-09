package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.models.LearningMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningMaterialRepository extends JpaRepository<LearningMaterial, Long> {
}