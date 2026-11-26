package com.medichannel.backend.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class AppointmentResponse {

    private Long id;
    private Long patientId;
    private Long sessionId;
    private Integer appointmentNumber;
    private String status;
    private String paymentStatus;
    private BigDecimal amount;
    private OffsetDateTime bookedAt;

    public AppointmentResponse(
            Long id,
            Long patientId,
            Long sessionId,
            Integer appointmentNumber,
            String status,
            String paymentStatus,
            BigDecimal amount,
            OffsetDateTime bookedAt) {

        this.id = id;
        this.patientId = patientId;
        this.sessionId = sessionId;
        this.appointmentNumber = appointmentNumber;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.amount = amount;
        this.bookedAt = bookedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public Integer getAppointmentNumber() {
        return appointmentNumber;
    }

    public String getStatus() {
        return status;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public OffsetDateTime getBookedAt() {
        return bookedAt;
    }
}