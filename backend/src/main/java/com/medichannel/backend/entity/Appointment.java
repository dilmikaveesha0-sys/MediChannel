package com.medichannel.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_id")
    private Long patientId;

    @Column(name = "session_id")
    private Long sessionId;

    @Column(name = "appointment_number")
    private Integer appointmentNumber;

    private String status;

    @Column(name = "payment_status")
    private String paymentStatus;

    private BigDecimal amount;

    @Column(name = "booked_at")
    private OffsetDateTime bookedAt;

    public Appointment() {
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