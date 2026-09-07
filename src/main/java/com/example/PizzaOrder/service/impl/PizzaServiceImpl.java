package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.Pizza;
import com.example.PizzaOrder.repository.PizzaRepository;
import com.example.PizzaOrder.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PizzaServiceImpl implements PizzaService {

    @Autowired
    private PizzaRepository pizzaRepository;

    private final String uploadDir = "uploads";

    @Override
    public Pizza addPizza(
            String pizzaName,
            String size,
            Double price,
            String description,
            String status,
            MultipartFile image
    ) {

        try {

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName =
                    UUID.randomUUID() + "_" + image.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(
                    image.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            Pizza pizza = new Pizza();

            pizza.setPizzaName(pizzaName);
            pizza.setSize(size);
            pizza.setPrice(price);
            pizza.setDescription(description);
            pizza.setStatus(status);
            pizza.setImage("/uploads/" + fileName);

            return pizzaRepository.save(pizza);

        } catch (IOException e) {

            throw new RuntimeException("Failed to upload image.", e);

        }

    }

    @Override
    public List<Pizza> getAllPizzas() {
        return pizzaRepository.findAllByOrderByIdDesc();
    }

    @Override
    public Optional<Pizza> getPizzaById(Long id) {
        return pizzaRepository.findById(id);
    }

    @Override
    public Pizza updatePizza(
            Long id,
            String pizzaName,
            String size,
            Double price,
            String description,
            String status,
            MultipartFile image
    ) {

        Optional<Pizza> existingPizza =
                pizzaRepository.findById(id);

        if (existingPizza.isEmpty()) {
            throw new RuntimeException("Pizza not found");
        }

        Pizza pizza = existingPizza.get();

        pizza.setPizzaName(pizzaName);
        pizza.setSize(size);
        pizza.setPrice(price);
        pizza.setDescription(description);
        pizza.setStatus(status);

        try {

            if (image != null && !image.isEmpty()) {

                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String fileName =
                        UUID.randomUUID() + "_" + image.getOriginalFilename();

                Path filePath =
                        uploadPath.resolve(fileName);

                Files.copy(
                        image.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING
                );

                pizza.setImage("/uploads/" + fileName);

            }

            return pizzaRepository.save(pizza);

        } catch (IOException e) {

            throw new RuntimeException("Failed to upload image.", e);

        }

    }
    @Override
    public void deletePizza(Long id) {

        if (!pizzaRepository.existsById(id)) {
            throw new RuntimeException("Pizza not found");
        }

        pizzaRepository.deleteById(id);

    }

    @Override
    public List<Pizza> getAvailablePizzas() {

        return pizzaRepository.findByStatus("AVAILABLE");

    }

}