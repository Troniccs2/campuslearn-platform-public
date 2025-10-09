package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.LearningMaterial;
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LearningMaterialService {

    private final LearningMaterialRepository learningMaterialRepository;


    public LearningMaterialService(LearningMaterialRepository learningMaterialRepository) {
        this.learningMaterialRepository = learningMaterialRepository;
    }

    public LearningMaterial saveMaterial(LearningMaterial material) {
        return learningMaterialRepository.save(material);
    }

    public Optional<LearningMaterial> getMaterialById(Long id) {
        return learningMaterialRepository.findById(id);
    }

    public List<LearningMaterial> getAllMaterials() {
        return learningMaterialRepository.findAll();
    }
}