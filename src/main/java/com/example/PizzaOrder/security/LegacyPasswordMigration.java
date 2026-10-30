package com.example.PizzaOrder.security;

import com.example.PizzaOrder.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class LegacyPasswordMigration implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LegacyPasswordMigration(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        userRepository.findAll().forEach(user -> {
            String password = user.getPassword();
            if (password != null && !password.startsWith("$2")) {
                user.setPassword(passwordEncoder.encode(password));
            }
        });
    }
}
