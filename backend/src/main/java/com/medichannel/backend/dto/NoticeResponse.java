package com.medichannel.backend.dto;

import java.time.OffsetDateTime;

public class NoticeResponse {

    private Long id;
    private String title;
    private String content;
    private OffsetDateTime createdAt;
    private OffsetDateTime expiresAt;
    private Boolean isPublished;

    public NoticeResponse(
            Long id,
            String title,
            String content,
            OffsetDateTime createdAt,
            OffsetDateTime expiresAt,
            Boolean isPublished) {

        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.isPublished = isPublished;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getExpiresAt() {
        return expiresAt;
    }

    public Boolean getIsPublished() {
        return isPublished;
    }
}