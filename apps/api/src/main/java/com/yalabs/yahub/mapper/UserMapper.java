package com.yalabs.yahub.mapper;

import java.time.LocalDateTime;
import java.util.UUID;

import com.yalabs.yahub.dtos.requests.UserRequest;
import com.yalabs.yahub.dtos.responses.UserResponse;
import com.yalabs.yahub.model.User;

public class UserMapper {
    public static User toEntity(UserRequest request, String passwordHash) {
        return User.builder()
        .id(UUID.randomUUID())
        .name(request.name())
        .email(request.email())
        .passwordHash(passwordHash)
        .createdAt(LocalDateTime.now())
        .build();
    }

    public static UserResponse toResponse(User user) {
    return new UserResponse(
        user.getId(),
        user.getName(),
        user.getEmail()
    );
}
}
