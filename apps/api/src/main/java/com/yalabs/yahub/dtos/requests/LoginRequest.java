package com.yalabs.yahub.dtos.requests;

public record LoginRequest(
    String email,
    String password
) {
}