package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.LearningMaterial;
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LearningMaterialService {

    private LearningMaterialRepository learningMaterialRepository;

    public LearningMaterial saveLearningMaterial(LearningMaterial material) {
        return null;
    }

    public Optional<LearningMaterial> findMaterialById(Long id) {
        return Optional.empty();
    }

    public List<LearningMaterial> findAllMaterials() {
        return null;
    }
}