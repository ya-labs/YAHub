package com.yalabs.yahub.dtos.responses;

public record LoginResponse(
        String token,
        UserResponse user) {
}
