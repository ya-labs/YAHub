package com.yalabs.yahub.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.yalabs.yahub.dtos.requests.UserRequest;
import com.yalabs.yahub.dtos.responses.UserResponse;
import com.yalabs.yahub.interfaces.IUserService;
import com.yalabs.yahub.mapper.UserMapper;
import com.yalabs.yahub.model.User;
import com.yalabs.yahub.repository.UserRepository;
import com.yalabs.yahub.shared.Result;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Result<UserResponse> register(UserRequest request) {
        try {

            if (emailExists(request.email())) {
                log.warn("E-mail {} already registered.", request.email());
                return Result.failure("E-mail {} already registered!".formatted(request.email()));
            }

            String passwordHash = passwordEncoder.encode(request.password());

            User user = UserMapper.toEntity(request, passwordHash);

            userRepository.save(user);
            log.info("User successfully registered.");

            UserResponse userResponse = UserMapper.toResponse(user);

            return Result.success(userResponse);

        } catch (Exception e) {
            return Result.failure(e.getMessage());
        }
    }

    public Result<UserResponse> deleteUser(UUID id) {
        try {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isEmpty()) {
                log.warn("User not found.");
                return Result.failure("User not found.");
            }

            User user = userOptional.get();

            userRepository.delete(user);

            UserResponse response = UserMapper.toResponse(user);

            return Result.success(response);

        } catch (Exception e) {
            return Result.failure(e.getMessage());
        }
    }

    public Result<List<UserResponse>> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();

            List<UserResponse> response = users.stream()
                    .map(UserMapper::toResponse)
                    .toList();

            return Result.success(response);
        } catch (Exception e) {
            return Result.failure(e.getMessage());
        }
    }
}
