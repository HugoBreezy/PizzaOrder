package com.example.PizzaOrder.repository;

import com.example.PizzaOrder.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    // Get all payments - newest order first
    List<Payment> findAllByOrderByIdDesc();

    // Get payments by status
    List<Payment> findByPaymentStatus(String paymentStatus);

    // Get payment for a specific order
    Optional<Payment> findByOrderId(Long orderId);

}