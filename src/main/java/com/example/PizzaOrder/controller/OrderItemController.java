package com.example.PizzaOrder.controller;

import com.example.PizzaOrder.entity.OrderItem;
import com.example.PizzaOrder.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or @requestAuthorization.ownsOrder(#orderItem.order.id)")
    public OrderItem addOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemService.addOrderItem(orderItem);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderItem> getAllOrderItems() {
        return orderItemService.getAllOrderItems();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @requestAuthorization.ownsOrderItem(#id)")
    public Optional<OrderItem> getOrderItemById(@PathVariable Long id) {
        return orderItemService.getOrderItemById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @requestAuthorization.ownsOrderItem(#id)")
    public OrderItem updateOrderItem(@PathVariable Long id,
                                     @RequestBody OrderItem orderItem) {
        return orderItemService.updateOrderItem(id, orderItem);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @requestAuthorization.ownsOrderItem(#id)")
    public String deleteOrderItem(@PathVariable Long id) {
        orderItemService.deleteOrderItem(id);
        return "Order Item deleted successfully";
    }
}
