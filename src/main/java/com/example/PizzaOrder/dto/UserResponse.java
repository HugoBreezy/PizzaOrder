package com.example.PizzaOrder.dto;

import com.example.PizzaOrder.entity.User;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        String phone,
        String gender,
        String address,
        String role,
        String status
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(), user.getFullName(), user.getEmail(), user.getPhone(),
                user.getGender(), user.getAddress(), user.getRole(), user.getStatus()
        );
    }
}
