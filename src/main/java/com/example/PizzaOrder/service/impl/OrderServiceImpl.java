package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.Order;
import com.example.PizzaOrder.entity.Payment;
import com.example.PizzaOrder.repository.OrderItemRepository;
import com.example.PizzaOrder.repository.OrderRepository;
import com.example.PizzaOrder.repository.PaymentRepository;
import com.example.PizzaOrder.repository.UserRepository;
import com.example.PizzaOrder.security.AppUserPrincipal;
import com.example.PizzaOrder.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    private UserRepository userRepository;


    // =====================================================
    // CREATE ORDER
    // =====================================================

    @Override
    @Transactional
    public Order createOrder(Order order) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!(principal instanceof AppUserPrincipal authenticatedUser)) {
            throw new RuntimeException("Authentication required");
        }
        order.setUser(userRepository.findById(authenticatedUser.id())
                .orElseThrow(() -> new RuntimeException("User not found")));

        // Set order date
        order.setOrderDate(LocalDateTime.now());

        // New order always starts as PENDING
        order.setStatus("PENDING");

        // Save order first so we get the generated ID
        Order savedOrder = orderRepository.save(order);


        // =================================================
        // CREATE PAYMENT AUTOMATICALLY
        // =================================================

        Payment payment = new Payment();

        // Link payment to this order
        payment.setOrder(savedOrder);

        // Cash on Delivery
        payment.setPaymentMethod("CASH_ON_DELIVERY");

        // Payment amount = order total
        payment.setAmount(savedOrder.getTotalAmount());

        // Payment starts as PENDING
        payment.setPaymentStatus("PENDING");

        // No payment date until delivery guy confirms cash
        payment.setPaymentDate(null);

        // Save payment
        paymentRepository.save(payment);


        return savedOrder;
    }


    // =====================================================
    // ADMIN
    // =====================================================

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


    // =====================================================
    // CUSTOMER
    // =====================================================

    @Override
    public List<Order> getOrdersByUser(Long userId) {

        return orderRepository.findByUserIdOrderByIdDesc(userId);
    }


    @Override
    public Page<Order> getOrdersByUser(
            Long userId,
            int page,
            int size
    ) {

        return orderRepository.findByUserIdOrderByIdDesc(
                userId,
                PageRequest.of(page, size)
        );
    }


    @Override
    public Optional<Order> getOrderById(Long id) {

        return orderRepository.findById(id);
    }


    // =====================================================
    // UPDATE ORDER
    // =====================================================

    @Override
    public Order updateOrder(
            Long id,
            Order updatedOrder
    ) {

        Optional<Order> existingOrder =
                orderRepository.findById(id);

        if (existingOrder.isEmpty()) {

            throw new RuntimeException(
                    "Order not found"
            );
        }

        Order order = existingOrder.get();


        // Delivered orders cannot be changed
        if ("DELIVERED".equalsIgnoreCase(
                order.getStatus()
        )) {

            throw new RuntimeException(
                    "Delivered orders cannot be changed."
            );
        }


        order.setTotalAmount(
                updatedOrder.getTotalAmount()
        );

        order.setStatus(
                updatedOrder.getStatus()
        );

        order.setUser(
                updatedOrder.getUser()
        );


        return orderRepository.save(order);
    }


    // =====================================================
    // UPDATE ORDER STATUS
    // =====================================================

    @Override
    public Order updateOrderStatus(
            Long id,
            String status
    ) {

        Optional<Order> existingOrder =
                orderRepository.findById(id);

        if (existingOrder.isEmpty()) {

            throw new RuntimeException(
                    "Order not found"
            );
        }

        Order order = existingOrder.get();


        // =================================================
        // DELIVERED ORDER IS LOCKED
        // =================================================

        if ("DELIVERED".equalsIgnoreCase(
                order.getStatus()
        )) {

            throw new RuntimeException(
                    "Delivered orders cannot be changed."
            );
        }


        order.setStatus(status);


        return orderRepository.save(order);
    }


    // =====================================================
    // DELETE ORDER
    // =====================================================

    @Override
    @Transactional
    public void deleteOrder(Long id) {

        Optional<Order> existingOrder =
                orderRepository.findById(id);

        if (existingOrder.isEmpty()) {

            throw new RuntimeException(
                    "Order not found"
            );
        }

        Order order = existingOrder.get();


        // Delivered orders cannot be deleted
        if ("DELIVERED".equalsIgnoreCase(
                order.getStatus()
        )) {

            throw new RuntimeException(
                    "Delivered orders cannot be deleted."
            );
        }


        // =================================================
        // CHECK PAYMENT
        // =================================================

        Optional<Payment> payment =
                paymentRepository.findByOrderId(id);


        if (payment.isPresent()) {

            // Paid orders cannot be deleted
            if ("PAID".equalsIgnoreCase(
                    payment.get().getPaymentStatus()
            )) {

                throw new RuntimeException(
                        "Paid orders cannot be deleted."
                );
            }


            // Delete pending payment
            paymentRepository.delete(
                    payment.get()
            );
        }


        // =================================================
        // DELETE ORDER ITEMS
        // =================================================

        orderItemRepository.deleteByOrderId(id);


        // =================================================
        // DELETE ORDER
        // =================================================

        orderRepository.delete(order);
    }
}
