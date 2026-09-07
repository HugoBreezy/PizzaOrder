import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminCustomers from "./pages/AdminCustomers";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminPizzas from "./pages/AdminPizzas";
import AddPizza from "./pages/AddPizza";
import EditPizza from "./pages/EditPizza";
import AdminOrders from "./pages/AdminOrders";
import AdminPayments from "./pages/AdminPayments";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<Orders />} />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
  path="/admin/customers"
  element={
    <ProtectedAdminRoute>
      <AdminCustomers />
    </ProtectedAdminRoute>
  }
/>

        <Route
          path="/admin/pizzas"
          element={
            <ProtectedAdminRoute>
              <AdminPizzas />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/pizzas/add"
          element={
            <ProtectedAdminRoute>
              <AddPizza />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/pizzas/edit/:id"
          element={
            <ProtectedAdminRoute>
              <EditPizza />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedAdminRoute>
              <AdminPayments />
            </ProtectedAdminRoute>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </BrowserRouter>

  );

}

export default App;