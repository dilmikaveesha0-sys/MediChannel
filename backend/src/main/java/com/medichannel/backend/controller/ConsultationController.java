package com.medichannel.backend.controller;

import com.medichannel.backend.dto.ConsultationResponse;
import com.medichannel.backend.service.ConsultationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @GetMapping
    public List<ConsultationResponse> getAllConsultations() {
        return consultationService.getAllConsultations();
    }
}