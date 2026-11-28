package com.medichannel.backend.dto;

public class AuthResponse {

    private String token;
    private String tokenType;
    private Long userId;
    private String role;

    public AuthResponse(String token, Long userId, String role) {
        this.token = token;
        this.tokenType = "Bearer";
        this.userId = userId;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Long getUserId() {
        return userId;
    }

    public String getRole() {
        return role;
    }
}