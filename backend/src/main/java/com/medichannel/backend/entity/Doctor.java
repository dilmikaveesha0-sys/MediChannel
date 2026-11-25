package com.medichannel.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "specialisation_id")
    private Long specialisationId;

    @Column(name = "slmc_number")
    private String slmcNumber;

    @Column(name = "qualifications")
    private String qualifications;

    @Column(name = "display_name")
    private String displayName;

    public Doctor() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getSpecialisationId() {
        return specialisationId;
    }

    public void setSpecialisationId(Long specialisationId) {
        this.specialisationId = specialisationId;
    }

    public String getSlmcNumber() {
        return slmcNumber;
    }

    public void setSlmcNumber(String slmcNumber) {
        this.slmcNumber = slmcNumber;
    }

    public String getQualifications() {
        return qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}