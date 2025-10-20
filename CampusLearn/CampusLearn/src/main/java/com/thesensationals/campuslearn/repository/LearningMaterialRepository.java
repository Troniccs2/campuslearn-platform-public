package com.thesensationals.campuslearn.repository;

import com.thesensationals.campuslearn.model.LearningMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List; // FIX: Added missing import

@Repository
public interface LearningMaterialRepository extends JpaRepository<LearningMaterial, Long> {
    /**
     * Finds all learning materials associated with a specific topic ID.
     * This method is used by the controller to display the materials list.
     * @param topicId The ID of the Topic.
     * @return A list of LearningMaterial entities.
     */
    List<LearningMaterial> findByTopicId(Long topicId);
}