package com.example.PizzaOrder.controller;

import com.example.PizzaOrder.entity.Order;
import com.example.PizzaOrder.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order createOrder(@RequestBody Order order) {

        return orderService.createOrder(order);

    }


    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();

    }


    @GetMapping("/page")
    public Page<Order> getAllOrdersPage(

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size

    ) {

        return orderService.getAllOrders(page, size);

    }




    @GetMapping("/user/{userId}")
    @PreAuthorize("@requestAuthorization.isSelfOrAdmin(#userId)")
    public List<Order> getOrdersByUser(
            @PathVariable Long userId
    ) {

        return orderService.getOrdersByUser(userId);

    }


    @GetMapping("/user/{userId}/page")
    @PreAuthorize("@requestAuthorization.isSelfOrAdmin(#userId)")
    public Page<Order> getOrdersByUserPage(

            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size

    ) {

        return orderService.getOrdersByUser(userId, page, size);

    }

    @GetMapping("/{id}")
    public Optional<Order> getOrderById(
            @PathVariable Long id
    ) {

        return orderService.getOrderById(id);

    }

    @PutMapping("/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order order
    ) {

        return orderService.updateOrder(id, order);

    }

    @PutMapping("/{id}/status")
    public Order updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return orderService.updateOrderStatus(id, status);

    }

    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id
    ) {

        orderService.deleteOrder(id);

        return "Order deleted successfully";

    }

}
