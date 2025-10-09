package com.thesensationals.campuslearn.Controller;

import com.thesensationals.campuslearn.models.LearningMaterial;
import com.thesensationals.campuslearn.service.LearningMaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/materials")
public class LearningMaterialController {

    private final LearningMaterialService materialService;


    public LearningMaterialController(LearningMaterialService materialService) {
        this.materialService = materialService;
    }

    @PostMapping
    public ResponseEntity<LearningMaterial> uploadMaterial(@RequestBody LearningMaterial material) {
        LearningMaterial saved = materialService.saveMaterial(material);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningMaterial> getMaterialById(@PathVariable Long id) {
        Optional<LearningMaterial> material = materialService.getMaterialById(id);
        return material.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<LearningMaterial> getAllMaterials() {
        return materialService.getAllMaterials();
    }
}