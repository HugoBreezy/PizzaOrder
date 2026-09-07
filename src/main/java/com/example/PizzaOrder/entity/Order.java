package com.example.PizzaOrder.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;

    private Double totalAmount;

    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonManagedReference
    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> orderItems;

    @JsonIgnore
    @OneToOne(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Payment payment;

    public Order() {
    }

    public Order(
            Long id,
            LocalDateTime orderDate,
            Double totalAmount,
            String status,
            User user,
            List<OrderItem> orderItems,
            Payment payment
    ) {

        this.id = id;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.status = status;
        this.user = user;
        this.orderItems = orderItems;
        this.payment = payment;

    }

    public Long getId() {

        return id;

    }

    public void setId(Long id) {

        this.id = id;

    }

    public LocalDateTime getOrderDate() {

        return orderDate;

    }

    public void setOrderDate(LocalDateTime orderDate) {

        this.orderDate = orderDate;

    }

    public Double getTotalAmount() {

        return totalAmount;

    }

    public void setTotalAmount(Double totalAmount) {

        this.totalAmount = totalAmount;

    }

    public String getStatus() {

        return status;

    }

    public void setStatus(String status) {

        this.status = status;

    }

    public User getUser() {

        return user;

    }

    public void setUser(User user) {

        this.user = user;

    }
    public List<OrderItem> getOrderItems() {

        return orderItems;

    }

    public void setOrderItems(List<OrderItem> orderItems) {

        this.orderItems = orderItems;

    }

    public Payment getPayment() {

        return payment;

    }

    public void setPayment(Payment payment) {

        this.payment = payment;

    }

}