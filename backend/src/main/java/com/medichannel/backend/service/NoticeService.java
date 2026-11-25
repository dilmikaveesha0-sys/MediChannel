package com.medichannel.backend.service;

import com.medichannel.backend.dto.NoticeResponse;
import com.medichannel.backend.entity.Notice;
import com.medichannel.backend.repository.NoticeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public List<NoticeResponse> getAllNotices() {

        return noticeRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private NoticeResponse convertToResponse(Notice notice) {

        return new NoticeResponse(
                notice.getId(),
                notice.getTitle(),
                notice.getContent(),
                notice.getCreatedAt(),
                notice.getExpiresAt(),
                notice.getIsPublished()
        );
    }
}