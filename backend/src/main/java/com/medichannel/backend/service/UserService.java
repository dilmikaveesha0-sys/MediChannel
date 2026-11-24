package com.medichannel.backend.service;

import com.medichannel.backend.dto.UserResponse;
import com.medichannel.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getEmailHash(),
                        user.getRole(),
                        user.getStatus(),
                        user.getCreatedAt()
                ))
                .toList();
    }
}