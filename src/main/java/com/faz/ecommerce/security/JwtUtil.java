package com.faz.ecommerce.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "09cae201f57f651fb7d027ef85c5fd2a8929e5eb2cc111af27f1cac270056aa7";
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    //generate jwt token
    public String generateToken(String username){
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    //Extract al claims
    private Claims extractClaims(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    //extract username from token
    public String extractUsername(String token){
        return extractClaims(token).getSubject();
    }

//    public String extractRole(String token){
//        return  extractClaims(token).get("role",String.class);
//    }

    //Validate token
    public boolean validateToken(String token, String username){
        try{
            String extractedUsername = extractUsername(token);
            return extractedUsername.equals(username) && !isTokenExpired(token);
        } catch (JwtException e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return  extractClaims(token).getExpiration().before(new Date());
    }


}
