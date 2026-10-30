package com.example.PizzaOrder.security;

import com.example.PizzaOrder.repository.OrderItemRepository;
import com.example.PizzaOrder.repository.OrderRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("requestAuthorization")
public class RequestAuthorization {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public RequestAuthorization(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public boolean isSelfOrAdmin(Long userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return false;
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) return true;
        return auth.getPrincipal() instanceof AppUserPrincipal principal && principal.id().equals(userId);
    }

    public boolean ownsOrder(Long orderId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getPrincipal() instanceof AppUserPrincipal principal
                && orderRepository.findById(orderId)
                .map(order -> order.getUser() != null && principal.id().equals(order.getUser().getId()))
                .orElse(false);
    }

    public boolean ownsOrderItem(Long orderItemId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getPrincipal() instanceof AppUserPrincipal principal
                && orderItemRepository.findById(orderItemId)
                .map(item -> item.getOrder() != null && item.getOrder().getUser() != null
                        && principal.id().equals(item.getOrder().getUser().getId()))
                .orElse(false);
    }
}
