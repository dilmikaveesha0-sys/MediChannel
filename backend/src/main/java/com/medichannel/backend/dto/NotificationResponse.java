package com.medichannel.backend.dto;

import java.time.OffsetDateTime;

public class NotificationResponse {

    private Long id;
    private Long userId;
    private String message;
    private String notificationType;
    private Boolean isRead;
    private OffsetDateTime createdAt;

    public NotificationResponse(
            Long id,
            Long userId,
            String message,
            String notificationType,
            Boolean isRead,
            OffsetDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.notificationType = notificationType;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}