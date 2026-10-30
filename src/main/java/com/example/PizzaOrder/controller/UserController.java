package com.example.PizzaOrder.controller;

import com.example.PizzaOrder.entity.User;
import com.example.PizzaOrder.dto.LoginRequest;
import com.example.PizzaOrder.dto.LoginResponse;
import com.example.PizzaOrder.dto.UserResponse;
import com.example.PizzaOrder.security.AppUserPrincipal;
import com.example.PizzaOrder.security.AuthTokenService;
import com.example.PizzaOrder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthTokenService authTokenService;

    // ==============================
    // CUSTOMER REGISTRATION
    // ==============================

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody User user) {
        return UserResponse.from(userService.registerUser(user));

    }

    // ==============================
    // ADMIN CREATES DELIVERY GUY
    // ==============================

    @PostMapping("/delivery")
    public UserResponse createDeliveryGuy(@RequestBody User user) {
        return UserResponse.from(userService.createDeliveryGuy(user));

    }

    // ==============================
    // LOGIN
    // ==============================

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginRequest request) {
        if (request.email() == null || request.password() == null) {
            throw new RuntimeException("Email and password are required");
        }

        try {

            User user = userService.loginUser(request.email(), request.password())
                    .orElseThrow(() -> new RuntimeException("Invalid email or password"));
            String token = authTokenService.issue(new AppUserPrincipal(user.getId(), user.getEmail(), user.getRole()));
            return new LoginResponse(token, UserResponse.from(user));

        } catch (RuntimeException e) {

            if ("ACCOUNT_DEACTIVATED".equals(e.getMessage())) {

                throw new RuntimeException(
                        "Your account has been deactivated. Please contact the administrator."
                );

            }

            throw e;

        }

    }

    // ==============================
    // GET ALL USERS
    // ==============================

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers().stream().map(UserResponse::from).collect(Collectors.toList());

    }

    // ==============================
    // GET USER BY ID
    // ==============================

    @GetMapping("/{id}")
    public Optional<UserResponse> getUserById(
            @PathVariable Long id
    ) {

        return userService.getUserById(id).map(UserResponse::from);

    }

    // ==============================
    // UPDATE USER
    // ==============================

    @PutMapping("/{id}")
    public UserResponse updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {

        return UserResponse.from(userService.updateUser(id, user));

    }

    // ==============================
    // ACTIVATE CUSTOMER
    // ==============================

    @PutMapping("/{id}/activate")
    public UserResponse activateCustomer(
            @PathVariable Long id
    ) {

        return UserResponse.from(userService.activateCustomer(id));

    }

    // ==============================
    // DEACTIVATE CUSTOMER
    // ==============================

    @PutMapping("/{id}/deactivate")
    public UserResponse deactivateCustomer(
            @PathVariable Long id
    ) {

        return UserResponse.from(userService.deactivateCustomer(id));

    }

}
