import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

// ===================== USERS =====================

export const registerUser = (user) =>
    API.post("/users/register", user);

export const loginUser = (email, password) =>
    API.post(`/users/login?email=${email}&password=${password}`);

export const getAllUsers = () =>
    API.get("/users");

// Activate Customer
export const activateCustomer = (id) =>
    API.put(`/users/${id}/activate`);

// Deactivate Customer
export const deactivateCustomer = (id) =>
    API.put(`/users/${id}/deactivate`);

// ===================== PIZZAS =====================

export const getAllPizzas = () =>
    API.get("/pizzas");

export const getPizzaById = (id) =>
    API.get(`/pizzas/${id}`);

export const addPizza = (formData) =>
    API.post("/pizzas", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const updatePizza = (id, formData) =>
    API.put(`/pizzas/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deletePizza = (id) =>
    API.delete(`/pizzas/${id}`);

// ===================== ORDERS =====================

export const getAllOrders = () =>
    API.get("/orders");

export const getOrdersPage = (page, size = 10) =>
    API.get(`/orders/page?page=${page}&size=${size}`);

export const getOrdersByUser = (userId) =>
    API.get(`/orders/user/${userId}`);

export const getOrdersByUserPage = (
    userId,
    page,
    size = 10
) =>
    API.get(`/orders/user/${userId}/page?page=${page}&size=${size}`);

export const createOrder = (order) =>
    API.post("/orders", order);

export const updateOrderStatus = (id, status) =>
    API.put(`/orders/${id}/status?status=${status}`);

export const deleteOrder = (id) =>
    API.delete(`/orders/${id}`);

// ===================== ORDER ITEMS =====================

export const addOrderItem = (orderItem) =>
    API.post("/order-items", orderItem);

// ===================== PAYMENTS =====================

export const createPayment = (payment) =>
    API.post("/payments", payment);

export const getAllPayments = () =>
    API.get("/payments");

export const getPaidPayments = () =>
    API.get("/payments/paid");

export const getPaymentByOrder = (orderId) =>
    API.get(`/payments/order/${orderId}`);

export const confirmPayment = (orderId) =>
    API.put(`/payments/confirm/${orderId}`);

export default API;