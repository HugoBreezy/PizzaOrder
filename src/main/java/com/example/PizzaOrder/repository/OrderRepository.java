package com.example.PizzaOrder.repository;

import com.example.PizzaOrder.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByStatus(String status);

    // Show newest orders first
    List<Order> findAllByOrderByIdDesc();

    // Get orders for one user only
    List<Order> findByUserIdOrderByIdDesc(Long userId);

    // Pagination - Admin
    Page<Order> findAllByOrderByIdDesc(Pageable pageable);

    // Pagination - Customer
    Page<Order> findByUserIdOrderByIdDesc(Long userId, Pageable pageable);

}