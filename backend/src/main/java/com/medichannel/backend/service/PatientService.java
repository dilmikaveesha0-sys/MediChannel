package com.medichannel.backend.service;

import com.medichannel.backend.dto.PatientResponse;
import com.medichannel.backend.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(patient -> new PatientResponse(
                        patient.getId(),
                        patient.getUserId(),
                        patient.getFullName(),
                        patient.getDateOfBirth(),
                        patient.getPhone(),
                        patient.getAddress()
                ))
                .toList();
    }
}