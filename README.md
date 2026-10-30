# 🍕 Pizza Order System

A full-stack Pizza Ordering System developed using React.js, Spring Boot, and PostgreSQL.

## 🛠️ Technologies Used

- React.js
- JavaScript
- HTML
- CSS
- Axios
- Spring Boot
- Java
- Spring Data JPA
- REST API
- PostgreSQL
- Maven
- Git & GitHub

## 👤 Customer Features

- Register and Login
- View available pizzas
- Add pizza to cart
- Place orders
- View order history
- Track order status

## 👨‍💼 Admin Features

- Admin Login
- Manage Pizzas
- Add, Edit and Delete Pizzas
- Manage Customers
- Activate and Deactivate Customers
- Manage Orders
- Update Order Status
- Manage Payments
- Confirm Payments

## 🏗️ System Architecture

React.js → REST API → Spring Boot → PostgreSQL

## Backend configuration

Set the database password in `DB_PASSWORD` before starting the backend. The
application also accepts `DB_URL` and `DB_USERNAME`; their defaults target a
local PostgreSQL database named `pizza_order`. Set `APP_AUTH_SECRET` to a
private random value of at least 32 characters so authentication tokens remain
valid across restarts. If it is omitted, the backend creates a temporary key at
startup and users must sign in again after a restart.

The API uses bearer tokens. Customer registration and login are public; user
management and delivery account creation require an admin token. Existing
plaintext passwords are converted to BCrypt hashes when the backend starts.

The database password that was previously in `application.properties` may
already exist in Git history. Rotate that database credential and configure the
new value through `DB_PASSWORD` before deploying.

## 👨‍💻 Developer

Hugo Breezy
