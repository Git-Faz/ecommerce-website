package com.faz.ecommerce.service;

import com.faz.ecommerce.dto.AuthResponse;
import com.faz.ecommerce.dto.LoginRequest;
import com.faz.ecommerce.dto.RegisterRequest;
import com.faz.ecommerce.entity.User;
import com.faz.ecommerce.repository.UserRepo;
import com.faz.ecommerce.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthResponse register (RegisterRequest request){
        if (userRepo.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username already exists");
        }
        if (userRepo.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        //create new user
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        userRepo.save(user);
        //generate token
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }

    public AuthResponse login(LoginRequest request){
        //Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
        );
        // If authentication successful, fetch user
        User user = userRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // Generate token
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
