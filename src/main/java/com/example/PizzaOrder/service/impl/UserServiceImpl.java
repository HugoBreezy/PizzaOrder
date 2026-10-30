package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.User;
import com.example.PizzaOrder.repository.UserRepository;
import com.example.PizzaOrder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Normal registration is always CUSTOMER
        user.setRole("CUSTOMER");
        user.setStatus("ACTIVE");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public User createDeliveryGuy(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setRole("DELIVERY");
        user.setStatus("ACTIVE");
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public Optional<User> loginUser(String email, String password) {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return Optional.empty();
        }

        User user = optionalUser.get();

        String storedPassword = user.getPassword();
        boolean isBcryptHash = storedPassword != null && storedPassword.startsWith("$2");
        boolean passwordMatches = isBcryptHash
                ? passwordEncoder.matches(password, storedPassword)
                : storedPassword != null && storedPassword.equals(password);
        if (!passwordMatches) {
            return Optional.empty();
        }

        if ("INACTIVE".equals(user.getStatus())) {
            throw new RuntimeException("ACCOUNT_DEACTIVATED");
        }

        // Upgrade legacy plaintext credentials on successful login.
        if (!isBcryptHash) {
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
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
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        if (updatedUser.getRole() != null) user.setRole(updatedUser.getRole());
        if (updatedUser.getStatus() != null) user.setStatus(updatedUser.getStatus());

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
