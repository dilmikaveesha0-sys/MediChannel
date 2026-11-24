package com.medichannel.backend.dto;

import java.time.LocalDate;

public class PatientResponse {

    private Long id;
    private Long userId;
    private String fullName;
    private LocalDate dateOfBirth;
    private String phone;
    private String address;

    public PatientResponse() {
    }

    public PatientResponse(Long id, Long userId, String fullName,
                           LocalDate dateOfBirth, String phone, String address) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.phone = phone;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }
}