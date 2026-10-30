package com.example.PizzaOrder.security;

public record AppUserPrincipal(Long id, String email, String role) {
}
