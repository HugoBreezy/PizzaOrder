package com.example.PizzaOrder.controller;

import com.example.PizzaOrder.entity.Pizza;
import com.example.PizzaOrder.service.PizzaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pizzas")
@CrossOrigin(origins = "http://localhost:5173")
public class PizzaController {

    @Autowired
    private PizzaService pizzaService;

    @PostMapping(consumes = {"multipart/form-data"})
    public Pizza addPizza(

            @RequestParam("pizzaName") String pizzaName,
            @RequestParam("size") String size,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam("status") String status,
            @RequestParam("image") MultipartFile image

    ) {

        return pizzaService.addPizza(
                pizzaName,
                size,
                price,
                description,
                status,
                image
        );
    }

    @GetMapping
    public List<Pizza> getAllPizzas() {
        return pizzaService.getAllPizzas();
    }

    @GetMapping("/{id}")
    public Optional<Pizza> getPizzaById(@PathVariable Long id) {
        return pizzaService.getPizzaById(id);
    }

    // ===== UPDATE PIZZA =====

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public Pizza updatePizza(

            @PathVariable Long id,

            @RequestParam("pizzaName") String pizzaName,
            @RequestParam("size") String size,
            @RequestParam("price") Double price,
            @RequestParam("description") String description,
            @RequestParam("status") String status,

            @RequestParam(value = "image", required = false)
            MultipartFile image

    ) {

        return pizzaService.updatePizza(
                id,
                pizzaName,
                size,
                price,
                description,
                status,
                image
        );

    }

    @DeleteMapping("/{id}")
    public String deletePizza(@PathVariable Long id) {
        pizzaService.deletePizza(id);
        return "Pizza deleted successfully";
    }

    @GetMapping("/available")
    public List<Pizza> getAvailablePizzas() {
        return pizzaService.getAvailablePizzas();
    }
}