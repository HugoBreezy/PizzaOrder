package com.example.PizzaOrder.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String email;

    private String phone;

    private String gender;

    private String address;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String role;

    // NEW FIELD
    private String status;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Order> orders;

    public User() {

    }

    public User(
            Long id,
            String fullName,
            String email,
            String phone,
            String gender,
            String address,
            String password,
            String role,
            String status,
            List<Order> orders
    ) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.address = address;
        this.password = password;
        this.role = role;
        this.status = status;
        this.orders = orders;

    }

    public Long getId() {

        return id;

    }

    public void setId(Long id) {

        this.id = id;

    }

    public String getFullName() {

        return fullName;

    }

    public void setFullName(String fullName) {

        this.fullName = fullName;

    }

    public String getEmail() {

        return email;

    }

    public void setEmail(String email) {

        this.email = email;

    }

    public String getPhone() {

        return phone;

    }

    public void setPhone(String phone) {

        this.phone = phone;

    }

    public String getGender() {

        return gender;

    }

    public void setGender(String gender) {

        this.gender = gender;

    }

    public String getAddress() {

        return address;

    }

    public void setAddress(String address) {

        this.address = address;

    }

    public String getPassword() {

        return password;

    }

    public void setPassword(String password) {

        this.password = password;

    }

    public String getRole() {

        return role;

    }

    public void setRole(String role) {

        this.role = role;

    }

    public String getStatus() {

        return status;

    }

    public void setStatus(String status) {

        this.status = status;

    }

    public List<Order> getOrders() {

        return orders;

    }

    public void setOrders(List<Order> orders) {

        this.orders = orders;

    }

}
