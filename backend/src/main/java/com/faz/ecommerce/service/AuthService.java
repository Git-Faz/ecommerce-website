package com.faz.ecommerce.service;

import com.faz.ecommerce.dto.AuthResponse;
import com.faz.ecommerce.dto.LoginRequest;
import com.faz.ecommerce.dto.RegisterRequest;
import com.faz.ecommerce.entity.User;
import com.faz.ecommerce.exception.BadRequestException;
import com.faz.ecommerce.repository.UserRepo;
import com.faz.ecommerce.security.CustomUserDetails;
import com.faz.ecommerce.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {

        if (userRepo.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exists");
        }
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        userRepo.save(user);

        CustomUserDetails principal = new CustomUserDetails(user);

        String token = jwtUtil.generateToken(principal);

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }


    public AuthResponse login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
        );

        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();

        String token = jwtUtil.generateToken(principal);

        return AuthResponse.builder()
                .token(token)
                .username(principal.getUsername())
                .role(principal.getRole())
                .build();
    }
}
