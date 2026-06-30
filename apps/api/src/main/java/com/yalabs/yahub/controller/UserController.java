package com.yalabs.yahub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yalabs.yahub.dtos.requests.UserRequest;
import com.yalabs.yahub.dtos.responses.UserResponse;
import com.yalabs.yahub.service.UserService;
import com.yalabs.yahub.shared.Result;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/register")
    public ResponseEntity<Result<UserResponse>> register(@RequestBody UserRequest user) {
        Result<UserResponse> response = userService.register(user);

        if (!response.result()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/users")
    public ResponseEntity<Result<List<UserResponse>>> getAllUsers() {
        Result<List<UserResponse>> response = userService.getAllUsers();

        if (!response.result()) {
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok(response);
    }
}
