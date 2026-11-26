package com.medichannel.backend.service;

import com.medichannel.backend.dto.FeedbackResponse;
import com.medichannel.backend.entity.Feedback;
import com.medichannel.backend.repository.FeedbackRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<FeedbackResponse> getAllFeedback() {

        return feedbackRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private FeedbackResponse convertToResponse(Feedback feedback) {

        return new FeedbackResponse(
                feedback.getId(),
                feedback.getAppointmentId(),
                feedback.getRating(),
                feedback.getComment(),
                feedback.getStatus(),
                feedback.getCreatedAt()
        );
    }
}