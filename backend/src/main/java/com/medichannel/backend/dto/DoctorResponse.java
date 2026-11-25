package com.medichannel.backend.dto;

public class DoctorResponse {

    private Long id;
    private Long userId;
    private Long specialisationId;
    private String slmcNumber;
    private String qualifications;
    private String displayName;

    public DoctorResponse() {
    }

    public DoctorResponse(Long id, Long userId, Long specialisationId,
                          String slmcNumber, String qualifications,
                          String displayName) {
        this.id = id;
        this.userId = userId;
        this.specialisationId = specialisationId;
        this.slmcNumber = slmcNumber;
        this.qualifications = qualifications;
        this.displayName = displayName;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getSpecialisationId() {
        return specialisationId;
    }

    public String getSlmcNumber() {
        return slmcNumber;
    }

    public String getQualifications() {
        return qualifications;
    }

    public String getDisplayName() {
        return displayName;
    }
}