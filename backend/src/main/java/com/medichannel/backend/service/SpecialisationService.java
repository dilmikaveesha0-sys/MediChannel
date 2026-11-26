package com.medichannel.backend.service;

import com.medichannel.backend.dto.SpecialisationResponse;
import com.medichannel.backend.repository.SpecialisationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialisationService {

    private final SpecialisationRepository specialisationRepository;

    public SpecialisationService(SpecialisationRepository specialisationRepository) {
        this.specialisationRepository = specialisationRepository;
    }

    public List<SpecialisationResponse> getAllSpecialisations() {
        return specialisationRepository.findAll()
                .stream()
                .map(specialisation -> new SpecialisationResponse(
                        specialisation.getId(),
                        specialisation.getName(),
                        specialisation.getDescription()
                ))
                .toList();
    }
}