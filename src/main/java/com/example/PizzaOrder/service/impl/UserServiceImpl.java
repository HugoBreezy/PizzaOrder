package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.User;
import com.example.PizzaOrder.repository.UserRepository;
import com.example.PizzaOrder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setRole("CUSTOMER");
        user.setStatus("ACTIVE");

        return userRepository.save(user);
    }

    @Override
    public Optional<User> loginUser(String email, String password) {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return Optional.empty();
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(password)) {
            return Optional.empty();
        }

        if ("INACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("ACCOUNT_DEACTIVATED");
        }

        return Optional.of(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        user.setGender(updatedUser.getGender());
        user.setAddress(updatedUser.getAddress());
        user.setPassword(updatedUser.getPassword());
        user.setRole(updatedUser.getRole());
        user.setStatus(updatedUser.getStatus());

        return userRepository.save(user);
    }

    @Override
    public User activateCustomer(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        user.setStatus("ACTIVE");

        return userRepository.save(user);
    }

    @Override
    public User deactivateCustomer(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        user.setStatus("INACTIVE");

        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        userRepository.deleteById(id);
    }
}