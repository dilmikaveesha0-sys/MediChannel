package com.medichannel.backend.dto;

public class RoomResponse {

    private Long id;
    private String roomNumber;
    private String roomName;
    private String locationDescription;
    private Boolean isActive;

    public RoomResponse(
            Long id,
            String roomNumber,
            String roomName,
            String locationDescription,
            Boolean isActive) {

        this.id = id;
        this.roomNumber = roomNumber;
        this.roomName = roomName;
        this.locationDescription = locationDescription;
        this.isActive = isActive;
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