package com.example.PizzaOrder.service;

import com.example.PizzaOrder.entity.Payment;

import java.util.List;
import java.util.Optional;

public interface PaymentService {

    // Create Payment
    Payment createPayment(Payment payment);

    // Confirm Payment Page
    List<Payment> getAllPayments();

    // Dashboard Revenue
    List<Payment> getPaidPayments();

    // Get Payment By ID
    Optional<Payment> getPaymentById(Long id);

    // Get Payment By Order
    Optional<Payment> getPaymentByOrderId(Long orderId);

    // Update Payment
    Payment updatePayment(Long id, Payment payment);

    // Confirm Cash On Delivery Payment
    Payment confirmPayment(Long orderId);

    // Delete Payment
    void deletePayment(Long id);

}