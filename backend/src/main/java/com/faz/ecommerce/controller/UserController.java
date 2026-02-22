package com.faz.ecommerce.controller;

import com.faz.ecommerce.dto.ProfileResponse;
import com.faz.ecommerce.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user-profile")
@RequiredArgsConstructor
public class UserController {

    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");

        String username = jwtUtil.extractUsername(token);
        String email = jwtUtil.extractEmail(token);
        String role = jwtUtil.extractRole(token);

        ProfileResponse profile = new ProfileResponse(email,username, role);
        return ResponseEntity.ok(profile);
    }

}
