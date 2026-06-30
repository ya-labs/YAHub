package com.yalabs.yahub.dtos.requests;

public record UserRequest(

    String email,
    String password,
    String name
) {
}
