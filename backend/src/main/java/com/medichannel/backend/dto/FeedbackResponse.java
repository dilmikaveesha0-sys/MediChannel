package com.medichannel.backend.dto;

import java.time.OffsetDateTime;

public class FeedbackResponse {

    private Long id;
    private Long appointmentId;
    private Short rating;
    private String comment;
    private String status;
    private OffsetDateTime createdAt;

    public FeedbackResponse(
            Long id,
            Long appointmentId,
            Short rating,
            String comment,
            String status,
            OffsetDateTime createdAt) {
        this.id = id;
        this.appointmentId = appointmentId;
        this.rating = rating;
        this.comment = comment;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public Short getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public String getStatus() {
        return status;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}