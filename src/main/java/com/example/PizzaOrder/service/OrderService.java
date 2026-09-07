package com.example.PizzaOrder.service;

import com.example.PizzaOrder.entity.Order;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    Order createOrder(Order order);

    // Admin
    List<Order> getAllOrders();

    // Admin Pagination
    Page<Order> getAllOrders(int page, int size);

    // Customer
    List<Order> getOrdersByUser(Long userId);

    // Customer Pagination
    Page<Order> getOrdersByUser(Long userId, int page, int size);

    Optional<Order> getOrderById(Long id);

    Order updateOrder(Long id, Order order);

    // Update Order Status
    Order updateOrderStatus(Long id, String status);

    void deleteOrder(Long id);

}