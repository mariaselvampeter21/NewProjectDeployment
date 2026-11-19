package com.srtms.user_service.service;

import com.srtms.user_service.dto.LoginRequest;
import com.srtms.user_service.dto.RegisterRequest;
import com.srtms.user_service.dto.UserResponse;
import com.srtms.user_service.entity.User;
import com.srtms.user_service.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(RegisterRequest request) {

        // 1. Check whether email already exists
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException(
                    "Email is already registered"
            );
        }

        // 2. Create a new User entity
        User user = new User();

        user.setName(request.name());
        user.setEmail(request.email());

        // 3. Hash the password using BCrypt
        user.setPassword(
                passwordEncoder.encode(request.password())
        );

        // 4. Save user into MySQL
        User savedUser = userRepository.save(user);

        // 5. Convert entity into response DTO
        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole().name(),
                savedUser.getCreatedAt()
        );
    }


    public UserResponse login(LoginRequest request) {

        // 1. Find user using email
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"
                ));

        // 2. Verify the entered password against BCrypt hash
        boolean passwordMatches = passwordEncoder.matches(
                request.password(),
                user.getPassword()
        );

        // 3. Reject incorrect password
        if (!passwordMatches) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        // 4. Return user details after successful login
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.getCreatedAt()
        );
    }


}

