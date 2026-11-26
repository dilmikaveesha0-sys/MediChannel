package com.medichannel.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "session_date")
    private LocalDate sessionDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "session_type")
    private String sessionType;

    private Integer capacity;

    @Column(name = "consultation_fee")
    private BigDecimal consultationFee;

    private String status;

    public Session() {
    }

    public Long getId() {
        return id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public String getSessionType() {
        return sessionType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public BigDecimal getConsultationFee() {
        return consultationFee;
    }

    public String getStatus() {
        return status;
    }
}