package com.medichannel.backend.dto;

import java.time.OffsetDateTime;

public class UserResponse {

    private Long id;
    private String emailHash;
    private String role;
    private String status;
    private OffsetDateTime createdAt;

    public UserResponse() {
    }

    public UserResponse(Long id, String emailHash, String role,
                        String status, OffsetDateTime createdAt) {
        this.id = id;
        this.emailHash = emailHash;
        this.role = role;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getEmailHash() {
        return emailHash;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }
}