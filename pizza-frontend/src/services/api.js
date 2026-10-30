import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && localStorage.getItem("authToken")) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
        }
        return Promise.reject(error);
    }
);

// ===================== USERS =====================

// Customer registration
export const registerUser = (user) =>
    API.post("/users/register", user);

// Login
export const loginUser = (email, password) =>
    API.post("/users/login", { email, password });

// Get all users
export const getAllUsers = () =>
    API.get("/users");

// ===================== DELIVERY GUYS =====================

// Admin creates Delivery Guy
export const createDeliveryGuy = (user) =>
    API.post("/users/delivery", user);

// Get all Delivery Guys
export const getDeliveryGuys = async () => {
    const response = await API.get("/users");

    return {
        ...response,
        data: response.data.filter(
            (user) => user.role === "DELIVERY"
        ),
    };
};

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
