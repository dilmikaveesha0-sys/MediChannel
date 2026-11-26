package com.medichannel.backend.service;

import com.medichannel.backend.dto.PatientRequest;
import com.medichannel.backend.dto.PatientResponse;
import com.medichannel.backend.entity.Patient;
import com.medichannel.backend.repository.PatientRepository;
import com.medichannel.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(
            PatientRepository patientRepository,
            UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public PatientResponse getPatientById(Long id) {
        Patient patient = findPatient(id);
        return convertToResponse(patient);
    }

    @Transactional
    public PatientResponse createPatient(PatientRequest request) {

        validateUser(request.getUserId());

        if (patientRepository.existsByUserId(request.getUserId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A patient already exists for this user"
            );
        }

        if (patientRepository.existsByNicHash(request.getNicHash())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "This NIC is already registered"
            );
        }

        Patient patient = new Patient();
        updatePatientFields(patient, request);

        Patient savedPatient = patientRepository.save(patient);

        return convertToResponse(savedPatient);
    }

    @Transactional
    public PatientResponse updatePatient(Long id, PatientRequest request) {

        Patient patient = findPatient(id);

        validateUser(request.getUserId());

        if (patientRepository.existsByUserId(request.getUserId())
                && !patient.getUserId().equals(request.getUserId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A patient already exists for this user"
            );
        }

        if (patientRepository.existsByNicHash(request.getNicHash())
                && !patient.getNicHash().equals(request.getNicHash())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "This NIC is already registered"
            );
        }

        updatePatientFields(patient, request);

        Patient updatedPatient = patientRepository.save(patient);

        return convertToResponse(updatedPatient);
    }

    @Transactional
    public void deletePatient(Long id) {
        Patient patient = findPatient(id);
        patientRepository.delete(patient);
    }

    private Patient findPatient(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Patient not found with ID: " + id
                ));
    }

    private void validateUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User does not exist with ID: " + userId
            );
        }
    }

    private void updatePatientFields(Patient patient, PatientRequest request) {
        patient.setUserId(request.getUserId());
        patient.setFullName(request.getFullName());
        patient.setNicHash(request.getNicHash());
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());
    }

    private PatientResponse convertToResponse(Patient patient) {
        return new PatientResponse(
                patient.getId(),
                patient.getUserId(),
                patient.getFullName(),
                patient.getDateOfBirth(),
                patient.getPhone(),
                patient.getAddress()
        );
    }
}