import { useEffect, useState } from "react";
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

    (sum, payment) => sum + payment.amount,

    0

  );

  return (

    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F4F0",
      }}
    >

      <AdminSidebar />

      <div className="flex-grow-1">

        <AdminTopbar />

        <div className="container-fluid p-4">

          <div className="row">

            <DashboardCard
              title="Total Users"
              value={users.length}
              icon="people-fill"
              growth="Registered Users"
              bgColor="#8B0000"
            />

            <DashboardCard
              title="Total Pizzas"
              value={pizzas.length}
              icon="shop"
              growth="Available Pizzas"
              bgColor="#A52A2A"
            />

            <DashboardCard
              title="Total Orders"
              value={orders.length}
              icon="bag-check-fill"
              growth="Orders"
              bgColor="#C0392B"
            />

            <DashboardCard
              title="Revenue"
              value={`TZS ${revenue.toLocaleString()}`}
              icon="cash-stack"
              growth="Paid Orders"
              bgColor="#922B21"
            />

          </div>

          {/* Bottom Section */}

          <div className="row mt-4">

            <div className="col-lg-8 mb-4">

              <div
                className="card border-0 shadow"
                style={{
                  borderRadius: "18px",
                }}
              >

                <div
                  className="card-header text-white"
                  style={{
                    backgroundColor: "#8B0000",
                  }}
                >

                  <h5 className="mb-0">

                    Recent Orders

                  </h5>

                </div>

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead>

                      <tr>

                        <th>#</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>

                      </tr>

                    </thead>

                    <tbody>

                      {orders.length === 0 ? (

                        <tr>

                          <td
                            colSpan="4"
                            className="text-center fw-bold"
                          >

                            No Orders Found

                          </td>

                        </tr>

                      ) : (

                        orders.slice(0, 5).map((order) => (

                          <tr key={order.id}>

                            <td>#{order.id}</td>

                            <td>{order.user?.fullName}</td>

                            <td>
                              TZS {Number(order.totalAmount).toLocaleString()}
                            </td>

                            <td>

                              <span
                                className={`badge ${
                                  order.status === "PENDING"
                                    ? "bg-warning text-dark"
                                    : order.status === "PREPARING"
                                    ? "bg-primary"
                                    : order.status === "ON_DELIVERY"
                                    ? "bg-info text-dark"
                                    : "bg-success"
                                }`}
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

            <div className="col-lg-4 mb-4">

              <div
                className="card border-0 shadow"
                style={{
                  borderRadius: "18px",
                }}
              >

                <div
                  className="card-header text-white"
                  style={{
                    backgroundColor: "#8B0000",
                  }}
                >

                  <h5 className="mb-0">

                    ⚡ Quick Actions

                  </h5>

                </div>

                <div className="card-body">

                  <a
                    href="/admin/pizzas/add"
                    className="btn btn-danger w-100 mb-3 py-3"
                    style={{
                      borderRadius: "12px",
                      fontWeight: "600",
                    }}
                  >

                    <i className="bi bi-plus-circle me-2"></i>

                    Add New Pizza

                  </a>

                  <a
                    href="/admin/payments"
                    className="btn btn-success w-100 mb-3 py-3"
                    style={{
                      borderRadius: "12px",
                      fontWeight: "600",
                    }}
                  >

                    <i className="bi bi-cash-coin me-2"></i>

                    Confirm Payment

                  </a>

                  <a
                    href="/admin/orders"
                    className="btn btn-primary w-100 py-3"
                    style={{
                      borderRadius: "12px",
                      fontWeight: "600",
                    }}
                  >

                    <i className="bi bi-bag-check me-2"></i>

                    Manage Orders

                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;