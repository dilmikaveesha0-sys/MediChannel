package com.medichannel.backend.dto;

import java.time.OffsetDateTime;

public class AuditLogResponse {

    private Long id;
    private Long userId;
    private String action;
    private OffsetDateTime eventTimestamp;
    private String ipAddress;
    private String details;

    public AuditLogResponse(
            Long id,
            Long userId,
            String action,
            OffsetDateTime eventTimestamp,
            String ipAddress,
            String details) {

        this.id = id;
        this.userId = userId;
        this.action = action;
        this.eventTimestamp = eventTimestamp;
        this.ipAddress = ipAddress;
        this.details = details;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getAction() {
        return action;
    }

    public OffsetDateTime getEventTimestamp() {
        return eventTimestamp;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public String getDetails() {
        return details;
    }
}