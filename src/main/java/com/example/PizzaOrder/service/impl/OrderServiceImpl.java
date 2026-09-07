package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.Order;
import com.example.PizzaOrder.entity.Payment;
import com.example.PizzaOrder.repository.OrderItemRepository;
import com.example.PizzaOrder.repository.OrderRepository;
import com.example.PizzaOrder.repository.PaymentRepository;
import com.example.PizzaOrder.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public Order createOrder(Order order) {

        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        return orderRepository.save(order);

    }

    // ===================== ADMIN =====================

    @Override
    public List<Order> getAllOrders() {

        return orderRepository.findAllByOrderByIdDesc();

    }

    @Override
    public Page<Order> getAllOrders(int page, int size) {

        return orderRepository.findAllByOrderByIdDesc(
                PageRequest.of(page, size)
        );

    }

    // ===================== CUSTOMER =====================

    @Override
    public List<Order> getOrdersByUser(Long userId) {

        return orderRepository.findByUserIdOrderByIdDesc(userId);

    }

    @Override
    public Page<Order> getOrdersByUser(Long userId, int page, int size) {

        return orderRepository.findByUserIdOrderByIdDesc(
                userId,
                PageRequest.of(page, size)
        );

    }

    @Override
    public Optional<Order> getOrderById(Long id) {

        return orderRepository.findById(id);

    }

    @Override
    public Order updateOrder(Long id, Order updatedOrder) {

        Optional<Order> existingOrder = orderRepository.findById(id);

        if (existingOrder.isEmpty()) {

            throw new RuntimeException("Order not found");

        }

        Order order = existingOrder.get();

        order.setTotalAmount(updatedOrder.getTotalAmount());
        order.setStatus(updatedOrder.getStatus());
        order.setUser(updatedOrder.getUser());

        return orderRepository.save(order);

    }

    @Override
    public Order updateOrderStatus(Long id, String status) {

        Optional<Order> existingOrder = orderRepository.findById(id);

        if (existingOrder.isEmpty()) {

            throw new RuntimeException("Order not found");

        }

        Order order = existingOrder.get();

        order.setStatus(status);

        return orderRepository.save(order);

    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {

        Optional<Order> existingOrder =
                orderRepository.findById(id);

        if (existingOrder.isEmpty()) {

            throw new RuntimeException("Order not found");

        }

        Order order = existingOrder.get();

        // Delivered orders cannot be deleted
        if ("DELIVERED".equalsIgnoreCase(order.getStatus())) {

            throw new RuntimeException(
                    "Delivered orders cannot be deleted."
            );

        }

        // Check payment
        Optional<Payment> payment =
                paymentRepository.findByOrderId(id);

        if (payment.isPresent()) {

            if ("PAID".equalsIgnoreCase(
                    payment.get().getPaymentStatus())) {

                throw new RuntimeException(
                        "Paid orders cannot be deleted."
                );

            }

            paymentRepository.delete(payment.get());

        }

        // Delete all order items
        orderItemRepository.deleteByOrderId(id);

        // Delete order
        orderRepository.delete(order);

    }

}