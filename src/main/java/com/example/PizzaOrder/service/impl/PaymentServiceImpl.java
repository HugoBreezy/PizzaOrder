package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.Payment;
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

    @Override
    public Payment createPayment(Payment payment) {

        if (payment.getPaymentStatus() == null) {

            payment.setPaymentStatus("PENDING");

        }

        payment.setPaymentDate(LocalDateTime.now());

        return paymentRepository.save(payment);

    }

    // ===== Confirm Payment Page =====
    @Override
    public List<Payment> getAllPayments() {

        return paymentRepository.findPaymentsReadyForConfirmation();

    }

    // ===== Dashboard Revenue =====
    @Override
    public List<Payment> getPaidPayments() {

        return paymentRepository.findByPaymentStatus("PAID");

    }

    @Override
    public Optional<Payment> getPaymentById(Long id) {

        return paymentRepository.findById(id);

    }

    @Override
    public Optional<Payment> getPaymentByOrderId(Long orderId) {

        return paymentRepository.findByOrderId(orderId);

    }

    @Override
    public Payment updatePayment(Long id, Payment updatedPayment) {

        Optional<Payment> existingPayment =
                paymentRepository.findById(id);

        if (existingPayment.isEmpty()) {

            throw new RuntimeException("Payment not found");

        }

        Payment payment = existingPayment.get();

        payment.setPaymentMethod(updatedPayment.getPaymentMethod());
        payment.setAmount(updatedPayment.getAmount());
        payment.setPaymentStatus(updatedPayment.getPaymentStatus());

        return paymentRepository.save(payment);

    }

    @Override
    public Payment confirmPayment(Long orderId) {

        Optional<Payment> existingPayment =
                paymentRepository.findByOrderId(orderId);

        if (existingPayment.isEmpty()) {

            throw new RuntimeException("Payment not found");

        }

        Payment payment = existingPayment.get();

        payment.setPaymentStatus("PAID");
        payment.setPaymentDate(LocalDateTime.now());

        return paymentRepository.save(payment);

    }

    @Override
    public void deletePayment(Long id) {

        if (!paymentRepository.existsById(id)) {

            throw new RuntimeException("Payment not found");

        }

        paymentRepository.deleteById(id);

    }

}