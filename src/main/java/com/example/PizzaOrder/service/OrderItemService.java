package com.example.PizzaOrder.service;

import com.example.PizzaOrder.entity.OrderItem;

import java.util.List;
import java.util.Optional;

public interface OrderItemService {

    OrderItem addOrderItem(OrderItem orderItem);

    List<OrderItem> getAllOrderItems();

    Optional<OrderItem> getOrderItemById(Long id);

    OrderItem updateOrderItem(Long id, OrderItem orderItem);

    void deleteOrderItem(Long id);

}