import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import DashboardCard from "../components/DashboardCard";

import {
  getAllUsers,
  getAllPizzas,
  getAllOrders,
  getPaidPayments,
} from "../services/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        usersResponse,
        pizzasResponse,
        ordersResponse,
        paymentsResponse,
      ] = await Promise.all([
        getAllUsers(),
        getAllPizzas(),
        getAllOrders(),
        getPaidPayments(),
      ]);

      setUsers(usersResponse.data);
      setPizzas(pizzasResponse.data);
      setOrders(ordersResponse.data);
      setPayments(paymentsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const revenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  // Latest orders first
  const recentOrders = [...orders]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-warning text-dark";

      case "PREPARING":
        return "bg-primary";

      case "ON_DELIVERY":
        return "bg-info text-dark";

      case "DELIVERED":
        return "bg-success";

      case "CANCELLED":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #faf7f4 0%, #f5eeee 50%, #fafafa 100%)",
      }}
    >
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <AdminTopbar />

        <main className="container-fluid px-4 py-4">

          {/* PAGE HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#8B0000",
                  letterSpacing: "-0.5px",
                }}
              >
                Dashboard
              </h2>

              <p className="text-muted mb-0">
                Overview of your pizza ordering system
              </p>
            </div>

            <div
              className="d-none d-md-flex align-items-center px-3 py-2"
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
                color: "#666",
                fontSize: "14px",
              }}
            >
              <i
                className="bi bi-speedometer2 me-2"
                style={{ color: "#8B0000" }}
              ></i>

              Admin Overview
            </div>
          </div>

          {/* STATISTICS */}
          <div className="row g-4">

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                }}
              >
                <DashboardCard
                  title="Total Users"
                  value={users.length}
                  icon="people-fill"
                  growth="Registered Users"
                  bgColor="#8B0000"
                />
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                }}
              >
                <DashboardCard
                  title="Total Pizzas"
                  value={pizzas.length}
                  icon="shop"
                  growth="Available Pizzas"
                  bgColor="#B02A2A"
                />
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                }}
              >
                <DashboardCard
                  title="Total Orders"
                  value={orders.length}
                  icon="bag-check-fill"
                  growth="All Orders"
                  bgColor="#C0392B"
                />
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div
                className="h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                }}
              >
                <DashboardCard
                  title="Revenue"
                  value={`TZS ${revenue.toLocaleString()}`}
                  icon="cash-stack"
                  growth="Paid Orders"
                  bgColor="#922B21"
                />
              </div>
            </div>

          </div>

          {/* MAIN DASHBOARD AREA */}
          <div className="row g-4 mt-2">

            {/* RECENT ORDERS */}
            <div className="col-xl-8">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
                  background: "#ffffff",
                }}
              >

                {/* SECTION HEADER */}
                <div
                  className="px-4 py-3 d-flex justify-content-between align-items-center"
                  style={{
                    borderBottom: "1px solid #eeeeee",
                  }}
                >
                  <div>
                    <h5
                      className="fw-bold mb-1"
                      style={{ color: "#222" }}
                    >
                      Recent Orders
                    </h5>

                    <small className="text-muted">
                      Latest customer orders
                    </small>
                  </div>

                  <Link
                    to="/admin/orders"
                    className="text-decoration-none fw-semibold"
                    style={{
                      color: "#8B0000",
                      fontSize: "14px",
                    }}
                  >
                    View All
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>

                {/* TABLE */}
                <div className="table-responsive">

                  <table
                    className="table align-middle mb-0"
                    style={{
                      minWidth: "600px",
                    }}
                  >

                    <thead
                      style={{
                        background: "#fafafa",
                      }}
                    >
                      <tr>
                        <th
                          className="px-4 py-3 text-muted"
                          style={{ fontSize: "13px" }}
                        >
                          ORDER
                        </th>

                        <th
                          className="py-3 text-muted"
                          style={{ fontSize: "13px" }}
                        >
                          CUSTOMER
                        </th>

                        <th
                          className="py-3 text-muted"
                          style={{ fontSize: "13px" }}
                        >
                          TOTAL
                        </th>

                        <th
                          className="py-3 text-muted"
                          style={{ fontSize: "13px" }}
                        >
                          STATUS
                        </th>
                      </tr>
                    </thead>

                    <tbody>

                      {recentOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-5"
                          >
                            <i
                              className="bi bi-receipt"
                              style={{
                                fontSize: "35px",
                                color: "#ccc",
                              }}
                            ></i>

                            <p className="text-muted mt-2 mb-0">
                              No Orders Found
                            </p>
                          </td>
                        </tr>
                      ) : (
                        recentOrders.map((order) => (
                          <tr key={order.id}>

                            <td className="px-4">
                              <div
                                className="d-inline-flex align-items-center justify-content-center"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "10px",
                                  background: "#fff1f1",
                                  color: "#8B0000",
                                  fontWeight: "700",
                                  fontSize: "13px",
                                }}
                              >
                                #{order.id}
                              </div>
                            </td>

                            <td>
                              <div className="d-flex align-items-center">

                                <div
                                  className="d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "50%",
                                    background:
                                      "linear-gradient(135deg, #8B0000, #c0392b)",
                                    color: "#fff",
                                    fontWeight: "700",
                                    fontSize: "13px",
                                  }}
                                >
                                  {order.user?.fullName
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                                </div>

                                <div>
                                  <div
                                    className="fw-semibold"
                                    style={{ color: "#222" }}
                                  >
                                    {order.user?.fullName || "Unknown"}
                                  </div>

                                  <small className="text-muted">
                                    Customer
                                  </small>
                                </div>

                              </div>
                            </td>

                            <td>
                              <span
                                className="fw-bold"
                                style={{ color: "#222" }}
                              >
                                TZS{" "}
                                {Number(
                                  order.totalAmount || 0
                                ).toLocaleString()}
                              </span>
                            </td>

                            <td>
                              <span
                                className={`badge ${getStatusClass(
                                  order.status
                                )}`}
                                style={{
                                  padding: "7px 11px",
                                  borderRadius: "20px",
                                  fontSize: "11px",
                                  letterSpacing: "0.3px",
                                }}
                              >
                                {order.status}
                              </span>
                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="col-xl-4">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
                  background: "#ffffff",
                }}
              >

                <div className="card-body p-4">

                  {/* HEADER */}
                  <div className="d-flex align-items-center mb-4">

                    <div
                      className="d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "13px",
                        background: "#fff1f1",
                        color: "#8B0000",
                      }}
                    >
                      <i className="bi bi-lightning-charge-fill fs-5"></i>
                    </div>

                    <div>
                      <h5
                        className="fw-bold mb-0"
                        style={{ color: "#222" }}
                      >
                        Quick Actions
                      </h5>

                      <small className="text-muted">
                        Frequently used actions
                      </small>
                    </div>

                  </div>

                  {/* ADD PIZZA */}
                  <Link
                    to="/admin/pizzas/add"
                    className="text-decoration-none d-block mb-3"
                  >
                    <div
                      className="d-flex align-items-center p-3"
                      style={{
                        borderRadius: "15px",
                        background: "#fff4f4",
                        border: "1px solid #ffe0e0",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "12px",
                          background: "#dc3545",
                          color: "#fff",
                        }}
                      >
                        <i className="bi bi-plus-lg fs-5"></i>
                      </div>

                      <div className="flex-grow-1">
                        <div
                          className="fw-bold"
                          style={{ color: "#222" }}
                        >
                          Add New Pizza
                        </div>

                        <small className="text-muted">
                          Create a new pizza
                        </small>
                      </div>

                      <i
                        className="bi bi-chevron-right"
                        style={{ color: "#8B0000" }}
                      ></i>
                    </div>
                  </Link>

                  {/* CONFIRM PAYMENT */}
                  <Link
                    to="/admin/payments"
                    className="text-decoration-none d-block mb-3"
                  >
                    <div
                      className="d-flex align-items-center p-3"
                      style={{
                        borderRadius: "15px",
                        background: "#f0fff7",
                        border: "1px solid #d7f5e5",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "12px",
                          background: "#198754",
                          color: "#fff",
                        }}
                      >
                        <i className="bi bi-cash-coin fs-5"></i>
                      </div>

                      <div className="flex-grow-1">
                        <div
                          className="fw-bold"
                          style={{ color: "#222" }}
                        >
                          Confirm Payment
                        </div>

                        <small className="text-muted">
                          Manage customer payments
                        </small>
                      </div>

                      <i
                        className="bi bi-chevron-right"
                        style={{ color: "#198754" }}
                      ></i>
                    </div>
                  </Link>

                  {/* MANAGE ORDERS */}
                  <Link
                    to="/admin/orders"
                    className="text-decoration-none d-block"
                  >
                    <div
                      className="d-flex align-items-center p-3"
                      style={{
                        borderRadius: "15px",
                        background: "#f1f6ff",
                        border: "1px solid #dce9ff",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "12px",
                          background: "#0d6efd",
                          color: "#fff",
                        }}
                      >
                        <i className="bi bi-bag-check-fill fs-5"></i>
                      </div>

                      <div className="flex-grow-1">
                        <div
                          className="fw-bold"
                          style={{ color: "#222" }}
                        >
                          Manage Orders
                        </div>

                        <small className="text-muted">
                          View and update orders
                        </small>
                      </div>

                      <i
                        className="bi bi-chevron-right"
                        style={{ color: "#0d6efd" }}
                      ></i>
                    </div>
                  </Link>

                </div>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;