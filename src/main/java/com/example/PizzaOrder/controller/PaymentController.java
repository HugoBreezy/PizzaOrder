package com.example.PizzaOrder.controller;

import com.example.PizzaOrder.dto.PaymentRequest;
import com.example.PizzaOrder.entity.Order;
import com.example.PizzaOrder.entity.Payment;
import com.example.PizzaOrder.repository.OrderRepository;
import com.example.PizzaOrder.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public Payment createPayment(
            @RequestBody PaymentRequest request
    ) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = new Payment();

        payment.setOrder(order);
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus());

        return paymentService.createPayment(payment);

    }

    // Confirm Payments Page
    @GetMapping
    public List<Payment> getAllPayments() {

        return paymentService.getAllPayments();

    }

    // Dashboard Revenue
    @GetMapping("/paid")
    public List<Payment> getPaidPayments() {

        return paymentService.getPaidPayments();

    }

    @GetMapping("/{id}")
    public Optional<Payment> getPaymentById(
            @PathVariable Long id
    ) {

        return paymentService.getPaymentById(id);

    }

    @GetMapping("/order/{orderId}")
    public Optional<Payment> getPaymentByOrderId(
            @PathVariable Long orderId
    ) {

        return paymentService.getPaymentByOrderId(orderId);

    }

    @PutMapping("/{id}")
    public Payment updatePayment(
            @PathVariable Long id,
            @RequestBody Payment payment
    ) {

        return paymentService.updatePayment(id, payment);

    }

    @PutMapping("/confirm/{orderId}")
    public Payment confirmPayment(
            @PathVariable Long orderId
    ) {

        return paymentService.confirmPayment(orderId);

    }

    @DeleteMapping("/{id}")
    public String deletePayment(
            @PathVariable Long id
    ) {

        paymentService.deletePayment(id);

        return "Payment deleted successfully";

    }

}