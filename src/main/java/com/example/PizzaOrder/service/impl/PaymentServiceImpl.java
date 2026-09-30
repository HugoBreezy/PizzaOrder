package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.Order;
import com.example.PizzaOrder.entity.Payment;
import com.example.PizzaOrder.repository.OrderRepository;
import com.example.PizzaOrder.repository.PaymentRepository;
import com.example.PizzaOrder.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    // =========================
    // CREATE PAYMENT
    // =========================
    @Override
    public Payment createPayment(Payment payment) {

        // New Cash on Delivery payment
        // starts as PENDING
        if (payment.getPaymentStatus() == null) {
            payment.setPaymentStatus("PENDING");
        }

        // Payment date should only exist
        // after the payment has actually been confirmed
        if ("PAID".equalsIgnoreCase(payment.getPaymentStatus())) {
            payment.setPaymentDate(LocalDateTime.now());
        } else {
            payment.setPaymentDate(null);
        }

        return paymentRepository.save(payment);
    }

    // =========================
    // GET ALL PAYMENTS
    // =========================
    @Override
    public List<Payment> getAllPayments() {

        // Admin should see all payment history
        // including PENDING and PAID payments
        return paymentRepository.findAllByOrderByIdDesc();
    }

    // =========================
    // PAID PAYMENTS
    // =========================
    @Override
    public List<Payment> getPaidPayments() {

        return paymentRepository.findByPaymentStatus("PAID");
    }

    // =========================
    // GET PAYMENT BY ID
    // =========================
    @Override
    public Optional<Payment> getPaymentById(Long id) {

        return paymentRepository.findById(id);
    }

    // =========================
    // GET PAYMENT BY ORDER
    // =========================
    @Override
    public Optional<Payment> getPaymentByOrderId(Long orderId) {

        return paymentRepository.findByOrderId(orderId);
    }

    // =========================
    // UPDATE PAYMENT
    // =========================
    @Override
    public Payment updatePayment(
            Long id,
            Payment updatedPayment
    ) {

        Optional<Payment> existingPayment =
                paymentRepository.findById(id);

        if (existingPayment.isEmpty()) {
            throw new RuntimeException(
                    "Payment not found"
            );
        }

        Payment payment = existingPayment.get();

        payment.setPaymentMethod(
                updatedPayment.getPaymentMethod()
        );

        payment.setAmount(
                updatedPayment.getAmount()
        );

        payment.setPaymentStatus(
                updatedPayment.getPaymentStatus()
        );

        // If payment becomes PAID,
        // record the actual confirmation time
        if ("PAID".equalsIgnoreCase(
                updatedPayment.getPaymentStatus())) {

            payment.setPaymentDate(
                    LocalDateTime.now()
            );

        } else {

            payment.setPaymentDate(null);
        }

        return paymentRepository.save(payment);
    }

    // =========================
    // CONFIRM CASH PAYMENT
    // =========================
    @Override
    public Payment confirmPayment(Long orderId) {

        // Find the order first
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found")
                );

        // Cash can only be confirmed while
        // the delivery guy is delivering the order
        if (!"ON_DELIVERY".equalsIgnoreCase(
                order.getStatus())) {

            throw new RuntimeException(
                    "Payment can only be confirmed when the order is ON_DELIVERY."
            );
        }

        Optional<Payment> existingPayment =
                paymentRepository.findByOrderId(orderId);

        if (existingPayment.isEmpty()) {

            throw new RuntimeException(
                    "Payment not found"
            );
        }

        Payment payment = existingPayment.get();

        // Prevent confirming an already paid payment
        if ("PAID".equalsIgnoreCase(
                payment.getPaymentStatus())) {

            throw new RuntimeException(
                    "Payment has already been confirmed."
            );
        }

        // Confirm cash received
        payment.setPaymentStatus("PAID");

        // Record the exact confirmation date/time
        payment.setPaymentDate(
                LocalDateTime.now()
        );

        return paymentRepository.save(payment);
    }

    // =========================
    // DELETE PAYMENT
    // =========================
    @Override
    public void deletePayment(Long id) {

        if (!paymentRepository.existsById(id)) {

            throw new RuntimeException(
                    "Payment not found"
            );
        }

        paymentRepository.deleteById(id);
    }
}