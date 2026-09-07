package com.example.PizzaOrder.service;

import com.example.PizzaOrder.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User registerUser(User user);

    Optional<User> loginUser(String email, String password);

    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    User updateUser(Long id, User user);

    // Activate Customer
    User activateCustomer(Long id);

    // Deactivate Customer
    User deactivateCustomer(Long id);

    // Delete Customer
    void deleteUser(Long id);

}