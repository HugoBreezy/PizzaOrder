package com.example.PizzaOrder.dto;

public class PaymentRequest {

    private Long orderId;

    private String paymentMethod;

    private Double amount;

    private String paymentStatus;

    public PaymentRequest() {
    }

    public PaymentRequest(Long orderId,
                          String paymentMethod,
                          Double amount,
                          String paymentStatus) {

        this.orderId = orderId;
        this.paymentMethod = paymentMethod;
        this.amount = amount;
        this.paymentStatus = paymentStatus;

    }

    public Long getOrderId() {

        return orderId;

    }

    public void setOrderId(Long orderId) {

        this.orderId = orderId;

    }

    public String getPaymentMethod() {

        return paymentMethod;

    }

    public void setPaymentMethod(String paymentMethod) {

        this.paymentMethod = paymentMethod;

    }

    public Double getAmount() {

        return amount;

    }

    public void setAmount(Double amount) {

        this.amount = amount;

    }

    public String getPaymentStatus() {

        return paymentStatus;

    }

    public void setPaymentStatus(String paymentStatus) {

        this.paymentStatus = paymentStatus;

    }

}