package com.example.PizzaOrder.repository;

import com.example.PizzaOrder.entity.Pizza;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PizzaRepository extends JpaRepository<Pizza, Long> {

    List<Pizza> findByStatus(String status);

    List<Pizza> findByPizzaName(String pizzaName);

    // Show newest pizzas first
    List<Pizza> findAllByOrderByIdDesc();

}