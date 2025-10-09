package com.thesensationals.campuslearn.controller;

import com.thesensationals.campuslearn.models.LearningMaterial;
import com.thesensationals.campuslearn.service.LearningMaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/materials")
public class LearningMaterialController {

    private LearningMaterialService materialService;

    public ResponseEntity<LearningMaterial> uploadMaterial(@RequestBody LearningMaterial material) {
        return null;
    }

    public ResponseEntity<LearningMaterial> getMaterialById(@PathVariable Long id) {
        return null;
    }

    public List<LearningMaterial> getAllMaterials() {
        return null;
    }
}