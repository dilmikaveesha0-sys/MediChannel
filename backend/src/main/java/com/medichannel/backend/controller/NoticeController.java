package com.medichannel.backend.controller;

import com.medichannel.backend.dto.NoticeResponse;
import com.medichannel.backend.service.NoticeService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @GetMapping
    public List<NoticeResponse> getAllNotices() {
        return noticeService.getAllNotices();
    }
}