package com.faz.ecommerce.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping("/profile")
    public String getProfile(Authentication authentication) {
        return "Hello " + authentication.getName() + "! Your role is: " +
                authentication.getAuthorities();
    }
}
