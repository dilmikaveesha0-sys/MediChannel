package com.medichannel.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class SessionResponse {

    private Long id;
    private Long doctorId;
    private Long roomId;
    private LocalDate sessionDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String sessionType;
    private Integer capacity;
    private BigDecimal consultationFee;
    private String status;

    public SessionResponse(
            Long id,
            Long doctorId,
            Long roomId,
            LocalDate sessionDate,
            LocalTime startTime,
            LocalTime endTime,
            String sessionType,
            Integer capacity,
            BigDecimal consultationFee,
            String status) {

        this.id = id;
        this.doctorId = doctorId;
        this.roomId = roomId;
        this.sessionDate = sessionDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.sessionType = sessionType;
        this.capacity = capacity;
        this.consultationFee = consultationFee;
        this.status = status;
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