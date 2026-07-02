package com.yalabs.yahub.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yalabs.yahub.dtos.requests.LoginRequest;
import com.yalabs.yahub.dtos.responses.LoginResponse;
import com.yalabs.yahub.service.AuthService;
import com.yalabs.yahub.shared.Result;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<Result<LoginResponse>> login(@RequestBody LoginRequest request) {

        Result<LoginResponse> response = authService.login(request);

        if (!response.result()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(response);
    }
}
