package com.medichannel.backend.service;

import com.medichannel.backend.dto.NotificationResponse;
import com.medichannel.backend.entity.Notification;
import com.medichannel.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationResponse> getAllNotifications() {
        return notificationRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private NotificationResponse convertToResponse(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getUserId(),
                notification.getMessage(),
                notification.getNotificationType(),
                notification.getIsRead(),
                notification.getCreatedAt()
        );
    }
}