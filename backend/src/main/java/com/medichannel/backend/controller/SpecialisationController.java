package com.medichannel.backend.controller;

import com.medichannel.backend.dto.SpecialisationResponse;
import com.medichannel.backend.service.SpecialisationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/specialisations")
public class SpecialisationController {

    private final SpecialisationService specialisationService;

    public SpecialisationController(SpecialisationService specialisationService) {
        this.specialisationService = specialisationService;
    }

    @GetMapping
    public List<SpecialisationResponse> getAllSpecialisations() {
        return specialisationService.getAllSpecialisations();
    }
}