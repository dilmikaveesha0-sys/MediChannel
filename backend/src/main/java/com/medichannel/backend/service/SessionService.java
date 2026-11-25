package com.medichannel.backend.service;

import com.medichannel.backend.dto.SessionResponse;
import com.medichannel.backend.entity.Session;
import com.medichannel.backend.repository.SessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public List<SessionResponse> getAllSessions() {

        return sessionRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private SessionResponse convertToResponse(Session session) {

        return new SessionResponse(
                session.getId(),
                session.getDoctorId(),
                session.getRoomId(),
                session.getSessionDate(),
                session.getStartTime(),
                session.getEndTime(),
                session.getSessionType(),
                session.getCapacity(),
                session.getConsultationFee(),
                session.getStatus()
        );
    }
}