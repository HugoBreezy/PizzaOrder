package com.example.PizzaOrder.repository;

import com.example.PizzaOrder.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByPaymentStatus(String paymentStatus);

    Optional<Payment> findByOrderId(Long orderId);

    @Query("""
            SELECT p
            FROM Payment p
            WHERE p.paymentStatus = 'PENDING'
            AND p.order.status = 'DELIVERED'
            """)
    List<Payment> findPaymentsReadyForConfirmation();

}