package com.example.PizzaOrder.repository;

import com.example.PizzaOrder.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrderId(Long orderId);

    @Transactional
    @Modifying
    void deleteByOrderId(Long orderId);

}