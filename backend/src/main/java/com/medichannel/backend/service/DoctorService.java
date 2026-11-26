package com.medichannel.backend.service;

import com.medichannel.backend.dto.DoctorResponse;
import com.medichannel.backend.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(doctor -> new DoctorResponse(
                        doctor.getId(),
                        doctor.getUserId(),
                        doctor.getSpecialisationId(),
                        doctor.getSlmcNumber(),
                        doctor.getQualifications(),
                        doctor.getDisplayName()
                ))
                .toList();
    }
}