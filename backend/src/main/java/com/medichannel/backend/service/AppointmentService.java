package com.medichannel.backend.service;

import com.medichannel.backend.dto.AppointmentResponse;
import com.medichannel.backend.entity.Appointment;
import com.medichannel.backend.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<AppointmentResponse> getAllAppointments() {

        return appointmentRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private AppointmentResponse convertToResponse(Appointment appointment) {

        return new AppointmentResponse(
                appointment.getId(),
                appointment.getPatientId(),
                appointment.getSessionId(),
                appointment.getAppointmentNumber(),
                appointment.getStatus(),
                appointment.getPaymentStatus(),
                appointment.getAmount(),
                appointment.getBookedAt()
        );
    }
}