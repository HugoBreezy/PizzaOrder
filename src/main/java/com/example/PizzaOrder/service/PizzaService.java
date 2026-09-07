package com.example.PizzaOrder.service;

import com.example.PizzaOrder.entity.Pizza;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface PizzaService {

    // ADD PIZZA
    Pizza addPizza(
            String pizzaName,
            String size,
            Double price,
            String description,
            String status,
            MultipartFile image
    );

    // GET ALL
    List<Pizza> getAllPizzas();

    // GET ONE
    Optional<Pizza> getPizzaById(Long id);

    // UPDATE PIZZA
    Pizza updatePizza(
            Long id,
            String pizzaName,
            String size,
            Double price,
            String description,
            String status,
            MultipartFile image
    );

    // DELETE
    void deletePizza(Long id);

    // AVAILABLE PIZZAS
    List<Pizza> getAvailablePizzas();

}