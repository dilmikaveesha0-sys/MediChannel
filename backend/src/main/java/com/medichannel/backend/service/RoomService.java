package com.medichannel.backend.service;

import com.medichannel.backend.dto.RoomResponse;
import com.medichannel.backend.entity.Room;
import com.medichannel.backend.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<RoomResponse> getAllRooms() {

        return roomRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private RoomResponse convertToResponse(Room room) {

        return new RoomResponse(
                room.getId(),
                room.getRoomNumber(),
                room.getRoomName(),
                room.getLocationDescription(),
                room.getIsActive()
        );
    }
}