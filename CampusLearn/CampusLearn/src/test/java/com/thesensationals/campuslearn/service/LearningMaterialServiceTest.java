package com.thesensationals.campuslearn.service;

import com.thesensationals.campuslearn.models.LearningMaterial;
import com.thesensationals.campuslearn.repository.LearningMaterialRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LearningMaterialServiceTest {
    @Mock
    private LearningMaterialRepository repository;

    @InjectMocks
    private LearningMaterialService service;

    public LearningMaterialServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveMaterial() {
        LearningMaterial material = new LearningMaterial();
        when(repository.save(material)).thenReturn(material);
        LearningMaterial result = service.saveMaterial(material);
        assertEquals(material, result);
    }

    @Test
    void testGetMaterialById() {
        LearningMaterial material = new LearningMaterial();
        material.setMaterialId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(material));
        Optional<LearningMaterial> result = service.getMaterialById(1L);
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getMaterialId());
    }

    @Test
    void testGetAllMaterials() {
        when(repository.findAll()).thenReturn(java.util.Collections.emptyList());
        assertTrue(service.getAllMaterials().isEmpty());
    }
}
