package com.srtms.user_service.dto;

public record LoginResponse(

        String accessToken,
        String tokenType,
        long expiresIn,
        UserResponse user

) {
}
