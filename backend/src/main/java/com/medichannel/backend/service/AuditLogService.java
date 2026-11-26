package com.medichannel.backend.service;

import com.medichannel.backend.dto.AuditLogResponse;
import com.medichannel.backend.entity.AuditLog;
import com.medichannel.backend.repository.AuditLogRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public List<AuditLogResponse> getAllAuditLogs() {

        return auditLogRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private AuditLogResponse convertToResponse(AuditLog auditLog) {

        return new AuditLogResponse(
                auditLog.getId(),
                auditLog.getUserId(),
                auditLog.getAction(),
                auditLog.getEventTimestamp(),
                auditLog.getIpAddress(),
                auditLog.getDetails()
        );
    }
}