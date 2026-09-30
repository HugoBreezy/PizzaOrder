package com.example.PizzaOrder.controller;

import com.example.PizzaOrder.entity.User;
import com.example.PizzaOrder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // ==============================
    // CUSTOMER REGISTRATION
    // ==============================

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        return userService.registerUser(user);

    }

    // ==============================
    // ADMIN CREATES DELIVERY GUY
    // ==============================

    @PostMapping("/delivery")
    public User createDeliveryGuy(@RequestBody User user) {

        return userService.createDeliveryGuy(user);

    }

    // ==============================
    // LOGIN
    // ==============================

    @PostMapping("/login")
    public Optional<User> loginUser(
            @RequestParam String email,
            @RequestParam String password
    ) {

        try {

            return userService.loginUser(email, password);

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
    public List<User> getAllUsers() {

        return userService.getAllUsers();

    }

    // ==============================
    // GET USER BY ID
    // ==============================

    @GetMapping("/{id}")
    public Optional<User> getUserById(
            @PathVariable Long id
    ) {

        return userService.getUserById(id);

    }

    // ==============================
    // UPDATE USER
    // ==============================

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {

        return userService.updateUser(id, user);

    }

    // ==============================
    // ACTIVATE CUSTOMER
    // ==============================

    @PutMapping("/{id}/activate")
    public User activateCustomer(
            @PathVariable Long id
    ) {

        return userService.activateCustomer(id);

    }

    // ==============================
    // DEACTIVATE CUSTOMER
    // ==============================

    @PutMapping("/{id}/deactivate")
    public User deactivateCustomer(
            @PathVariable Long id
    ) {

        return userService.deactivateCustomer(id);

    }

}