package com.example.PizzaOrder.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "pizzas")
public class Pizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pizzaName;

    private String size;

    private Double price;

    private String description;

    private String image;

    private String status;

    @JsonManagedReference(value = "pizza-orderitems")
    @OneToMany(mappedBy = "pizza")
    private List<OrderItem> orderItems;

    public Pizza() {
    }

    public Pizza(Long id, String pizzaName, String size, Double price,
                 String description, String image, String status,
                 List<OrderItem> orderItems) {

        this.id = id;
        this.pizzaName = pizzaName;
        this.size = size;
        this.price = price;
        this.description = description;
        this.image = image;
        this.status = status;
        this.orderItems = orderItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPizzaName() {
        return pizzaName;
    }

    public void setPizzaName(String pizzaName) {
        this.pizzaName = pizzaName;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}