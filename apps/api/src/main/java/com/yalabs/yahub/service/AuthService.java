package com.yalabs.yahub.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.yalabs.yahub.dtos.requests.LoginRequest;
import com.yalabs.yahub.dtos.responses.LoginResponse;
import com.yalabs.yahub.dtos.responses.UserResponse;
import com.yalabs.yahub.mapper.UserMapper;
import com.yalabs.yahub.model.User;
import com.yalabs.yahub.repository.UserRepository;
import com.yalabs.yahub.shared.Result;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public Result<LoginResponse> login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.email());

        if (userOptional.isEmpty()) {
            return Result.failure("Invalid email or password.");
        }

        User user = userOptional.get();

        boolean passwordMatches = passwordEncoder.matches(
                request.password(),
                user.getPasswordHash());

        if (!passwordMatches) {
            return Result.failure("Invalid email or password.");
        }

        String token = jwtService.generateToken(user);
        UserResponse userResponse = UserMapper.toResponse(user);

        return Result.success(new LoginResponse(token, userResponse));
    }
}
