package com.medichannel.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number")
    private String roomNumber;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "location_description")
    private String locationDescription;

    @Column(name = "is_active")
    private Boolean isActive;

    public Room() {
    }

    public Long getId() {
        return id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public String getRoomName() {
        return roomName;
    }

    public String getLocationDescription() {
        return locationDescription;
    }

    public Boolean getIsActive() {
        return isActive;
    }
}