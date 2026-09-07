package com.example.PizzaOrder.service.impl;

import com.example.PizzaOrder.entity.OrderItem;
import com.example.PizzaOrder.entity.Pizza;
import com.example.PizzaOrder.repository.OrderItemRepository;
import com.example.PizzaOrder.repository.PizzaRepository;
import com.example.PizzaOrder.service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PizzaRepository pizzaRepository;

    @Override
    public OrderItem addOrderItem(OrderItem orderItem) {

        // Pata pizza kwenye database
        Pizza pizza = pizzaRepository.findById(orderItem.getPizza().getId())
                .orElseThrow(() -> new RuntimeException("Pizza not found"));

        // Chukua bei ya pizza
        orderItem.setPrice(pizza.getPrice());

        // Hesabu subtotal
        orderItem.setSubtotal(pizza.getPrice() * orderItem.getQuantity());

        // Save
        return orderItemRepository.save(orderItem);
    }

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public Optional<OrderItem> getOrderItemById(Long id) {
        return orderItemRepository.findById(id);
    }

    @Override
    public OrderItem updateOrderItem(Long id, OrderItem updatedOrderItem) {

        Optional<OrderItem> existingOrderItem = orderItemRepository.findById(id);

        if (existingOrderItem.isPresent()) {

            OrderItem orderItem = existingOrderItem.get();

            Pizza pizza = pizzaRepository.findById(updatedOrderItem.getPizza().getId())
                    .orElseThrow(() -> new RuntimeException("Pizza not found"));

            orderItem.setQuantity(updatedOrderItem.getQuantity());
            orderItem.setPrice(pizza.getPrice());
            orderItem.setSubtotal(pizza.getPrice() * updatedOrderItem.getQuantity());

            orderItem.setOrder(updatedOrderItem.getOrder());
            orderItem.setPizza(pizza);

            return orderItemRepository.save(orderItem);
        }

        throw new RuntimeException("Order Item not found");
    }

    @Override
    public void deleteOrderItem(Long id) {

        if (!orderItemRepository.existsById(id)) {
            throw new RuntimeException("Order Item not found");
        }

        orderItemRepository.deleteById(id);
    }
}