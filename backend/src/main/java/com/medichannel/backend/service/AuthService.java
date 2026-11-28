
package com.medichannel.backend.service;

import com.medichannel.backend.dto.AuthResponse;
import com.medichannel.backend.dto.LoginRequest;
import com.medichannel.backend.dto.RegisterRequest;

import com.medichannel.backend.entity.User;
import com.medichannel.backend.entity.Patient;

import com.medichannel.backend.repository.UserRepository;
import com.medichannel.backend.repository.PatientRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailHashService emailHashService;
    private final NicHashService nicHashService;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PatientRepository patientRepository,
            PasswordEncoder passwordEncoder,
            EmailHashService emailHashService,
            NicHashService nicHashService,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailHashService = emailHashService;
        this.nicHashService = nicHashService;
        this.jwtService = jwtService;
    }

    // PATIENT REGISTRATION
    @Transactional
    public AuthResponse register(RegisterRequest request) {

        String emailHash =
                emailHashService.hashEmail(request.getEmail());

        String nicHash =
                nicHashService.hashNic(request.getNic());

        if (userRepository.existsByEmailHash(emailHash)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered"
            );
        }

        if (patientRepository.existsByNicHash(nicHash)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "NIC already registered"
            );
        }

        // Create User
        User user = new User();

        user.setEmailHash(emailHash);

        user.setPasswordHash(
                passwordEncoder.encode(request.getPassword())
        );

        // Public registration always creates a PATIENT
        user.setRole("PATIENT");
        user.setStatus("ACTIVE");
        user.setCreatedAt(OffsetDateTime.now());

        User savedUser = userRepository.saveAndFlush(user);

        // Create Patient profile
        Patient patient = new Patient();

        patient.setUserId(savedUser.getId());
        patient.setFullName(request.getFullName());
        patient.setNicHash(nicHash);
        patient.setDateOfBirth(request.getDateOfBirth());
        patient.setPhone(request.getPhone());
        patient.setAddress(request.getAddress());

        patientRepository.save(patient);

        // Generate JWT
        String token = jwtService.generateToken(
                savedUser.getId(),
                savedUser.getRole()
        );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getRole()
        );
    }

    // USER LOGIN
    public AuthResponse login(LoginRequest request) {

        String emailHash =
                emailHashService.hashEmail(request.getEmail());

        User user = userRepository.findByEmailHash(emailHash)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"
                ));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        if (!"ACTIVE".equals(user.getStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Account is not active"
            );
        }

        String token = jwtService.generateToken(
                user.getId(),
                user.getRole()
        );

        return new AuthResponse(
                token,
                user.getId(),
                user.getRole()
        );
    }
}
