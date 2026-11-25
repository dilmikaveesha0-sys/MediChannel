package com.medichannel.backend.service;

import com.medichannel.backend.dto.ConsultationResponse;
import com.medichannel.backend.entity.Consultation;
import com.medichannel.backend.repository.ConsultationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;

    public ConsultationService(ConsultationRepository consultationRepository) {
        this.consultationRepository = consultationRepository;
    }

    public List<ConsultationResponse> getAllConsultations() {
        return consultationRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private ConsultationResponse convertToResponse(Consultation consultation) {
        return new ConsultationResponse(
                consultation.getId(),
                consultation.getAppointmentId(),
                consultation.getDiagnosis(),
                consultation.getAdvice(),
                consultation.getPrescription(),
                consultation.getConsultationNotes(),
                consultation.getCreatedAt()
        );
    }
}