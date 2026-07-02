package com.yalabs.yahub.dtos.responses;

import java.util.UUID;

public record UserResponse(
    UUID id,
    String name,
    String email
) {
}
