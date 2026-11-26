package com.medichannel.backend.dto;

import java.time.OffsetDateTime;

public class ConsultationResponse {

    private Long id;
    private Long appointmentId;
    private String diagnosis;
    private String advice;
    private String prescription;
    private String consultationNotes;
    private OffsetDateTime createdAt;

    public ConsultationResponse(
            Long id,
            Long appointmentId,
            String diagnosis,
            String advice,
            String prescription,
            String consultationNotes,
            OffsetDateTime createdAt) {
        this.id = id;
        this.appointmentId = appointmentId;
        this.diagnosis = diagnosis;
        this.advice = advice;
        this.prescription = prescription;
        this.consultationNotes = consultationNotes;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public String getAdvice() {
        return advice;
    }

    public String getPrescription() {
        return prescription;
    }

    public String getConsultationNotes() {
        return consultationNotes;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}