package com.faz.ecommerce.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AuthResponse {
    private String token;
    private String username;
    private String role;
    private String email;
}
