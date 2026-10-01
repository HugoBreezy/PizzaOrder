import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminCustomers from "./pages/AdminCustomers";
import AdminDeliveryGuys from "./pages/AdminDeliveryGuys";
import AdminPizzas from "./pages/AdminPizzas";
import AddPizza from "./pages/AddPizza";
import EditPizza from "./pages/EditPizza";
import AdminOrders from "./pages/AdminOrders";
import AdminPayments from "./pages/AdminPayments";

import DeliveryDashboard from "./pages/DeliveryDashboard";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedDeliveryRoute from "./components/ProtectedDeliveryRoute";


// =====================================================
// CUSTOMER PROTECTED ROUTE
// =====================================================

function ProtectedCustomerRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // No logged-in user
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // ADMIN should go to admin dashboard
  if (user.role === "ADMIN") {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );

  }


  // DELIVERY should go to delivery dashboard
  if (user.role === "DELIVERY") {

    return (
      <Navigate
        to="/delivery"
        replace
      />
    );

  }


  // Only CUSTOMER can continue
  if (user.role !== "CUSTOMER") {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  // Customer account deactivated
  if (user.status === "INACTIVE") {

    localStorage.removeItem("user");

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return children;
}


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =================================================
            PUBLIC
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            CUSTOMER
            ONLY CUSTOMER CAN ACCESS THESE PAGES
        ================================================= */}

        <Route
          path="/menu"
          element={
            <ProtectedCustomerRoute>
              <Menu />
            </ProtectedCustomerRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedCustomerRoute>
              <Cart />
            </ProtectedCustomerRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedCustomerRoute>
              <Checkout />
            </ProtectedCustomerRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedCustomerRoute>
              <Orders />
            </ProtectedCustomerRoute>
          }
        />


        {/* =================================================
            ADMIN
        ================================================= */}

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
          path="/admin/delivery-guys"
          element={
            <ProtectedAdminRoute>
              <AdminDeliveryGuys />
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


        {/* =================================================
            DELIVERY
        ================================================= */}

        <Route
          path="/delivery"
          element={
            <ProtectedDeliveryRoute>
              <DeliveryDashboard />
            </ProtectedDeliveryRoute>
          }
        />


        {/* =================================================
            UNKNOWN URL
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>


      {/* =================================================
          TOAST
      ================================================= */}

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