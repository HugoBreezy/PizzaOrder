import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrdersByUserPage } from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders(page);
  }, [page]);

  const loadOrders = async (currentPage) => {

    try {

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setOrders([]);
        return;
      }

      const response = await getOrdersByUserPage(
        user.id,
        currentPage,
        5
      );

      setOrders(response.data.content);
      setTotalPages(response.data.totalPages);

    } catch (error) {

      console.log(error);
      setOrders([]);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {

    switch (status) {

      case "PENDING":
        return {
          background: "#fff3cd",
          color: "#856404",
          icon: "bi-hourglass-split",
        };

      case "PREPARING":
        return {
          background: "#e7f1ff",
          color: "#0d6efd",
          icon: "bi-fire",
        };

      case "ON_DELIVERY":
        return {
          background: "#cff4fc",
          color: "#087990",
          icon: "bi-bicycle",
        };

      case "DELIVERED":
        return {
          background: "#d1e7dd",
          color: "#146c43",
          icon: "bi-check-circle-fill",
        };

      default:
        return {
          background: "#e9ecef",
          color: "#495057",
          icon: "bi-question-circle",
        };
    }
  };

  // =========================
  // STATUS LABEL
  // =========================

  const getStatusLabel = (status) => {

    switch (status) {

      case "PENDING":
        return "Pending";

      case "PREPARING":
        return "Preparing";

      case "ON_DELIVERY":
        return "On Delivery";

      case "DELIVERED":
        return "Delivered";

      default:
        return status || "Unknown";
    }
  };

  // =========================
  // SUMMARY
  // =========================

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status === "PENDING" ||
      order.status === "PREPARING" ||
      order.status === "ON_DELIVERY"
  ).length;

  return (
    <>
      <Navbar />

      <section
        style={{
          background:
            "linear-gradient(135deg, #faf7f4 0%, #f5eeee 50%, #fafafa 100%)",
          minHeight: "80vh",
          paddingTop: "45px",
          paddingBottom: "60px",
        }}
      >

        <div className="container">

          {/* ================= HEADER ================= */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <div className="d-flex align-items-center mb-2">

                <div
                  className="d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "#fff1f1",
                    color: "#8B0000",
                  }}
                >

                  <i className="bi bi-receipt-cutoff fs-4"></i>

                </div>

                <div>

                  <h2
                    className="fw-bold mb-0"
                    style={{
                      color: "#8B0000",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    My Orders
                  </h2>

                  <p className="text-muted mb-0 mt-1">
                    Track and view your pizza orders
                  </p>

                </div>

              </div>

            </div>


            {/* ORDER COUNT */}

            <div
              className="d-none d-md-flex align-items-center px-3 py-2"
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow:
                  "0 5px 20px rgba(0,0,0,0.06)",
              }}
            >

              <i
                className="bi bi-bag-check-fill me-2"
                style={{
                  color: "#8B0000",
                }}
              ></i>

              <span
                className="fw-semibold"
                style={{
                  color: "#555",
                  fontSize: "14px",
                }}
              >
                {totalOrders} Orders
              </span>

            </div>

          </div>


          {/* ================= SUMMARY CARDS ================= */}

          <div className="row g-3 mb-4">

            {/* TOTAL */}

            <div className="col-md-4">

              <div
                className="h-100 p-3"
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow:
                    "0 6px 25px rgba(0,0,0,0.05)",
                  border:
                    "1px solid rgba(0,0,0,0.04)",
                }}
              >

                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "12px",
                      background: "#fff1f1",
                      color: "#8B0000",
                    }}
                  >

                    <i className="bi bi-bag-fill fs-5"></i>

                  </div>

                  <div>

                    <small className="text-muted">
                      Orders on this page
                    </small>

                    <h4 className="fw-bold mb-0">
                      {totalOrders}
                    </h4>

                  </div>

                </div>

              </div>

            </div>


            {/* ACTIVE */}

            <div className="col-md-4">

              <div
                className="h-100 p-3"
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow:
                    "0 6px 25px rgba(0,0,0,0.05)",
                  border:
                    "1px solid rgba(0,0,0,0.04)",
                }}
              >

                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "12px",
                      background: "#e7f1ff",
                      color: "#0d6efd",
                    }}
                  >

                    <i className="bi bi-arrow-repeat fs-5"></i>

                  </div>

                  <div>

                    <small className="text-muted">
                      Active Orders
                    </small>

                    <h4 className="fw-bold mb-0">
                      {activeOrders}
                    </h4>

                  </div>

                </div>

              </div>

            </div>


            {/* DELIVERED */}

            <div className="col-md-4">

              <div
                className="h-100 p-3"
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  boxShadow:
                    "0 6px 25px rgba(0,0,0,0.05)",
                  border:
                    "1px solid rgba(0,0,0,0.04)",
                }}
              >

                <div className="d-flex align-items-center">

                  <div
                    className="d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "12px",
                      background: "#d1e7dd",
                      color: "#146c43",
                    }}
                  >

                    <i className="bi bi-check-circle-fill fs-5"></i>

                  </div>

                  <div>

                    <small className="text-muted">
                      Delivered
                    </small>

                    <h4 className="fw-bold mb-0">
                      {deliveredOrders}
                    </h4>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ================= ORDERS CARD ================= */}

          <div
            className="card border-0"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "#ffffff",
              boxShadow:
                "0 8px 30px rgba(0,0,0,0.07)",
            }}
          >

            {/* CARD HEADER */}

            <div
              className="px-4 py-3 d-flex justify-content-between align-items-center"
              style={{
                borderBottom:
                  "1px solid #eeeeee",
              }}
            >

              <div>

                <h5
                  className="fw-bold mb-1"
                  style={{
                    color: "#222",
                  }}
                >
                  Order History
                </h5>

                <small className="text-muted">
                  View the status and details of your orders
                </small>

              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "#fff1f1",
                  color: "#8B0000",
                }}
              >

                <i className="bi bi-clock-history fs-5"></i>

              </div>

            </div>


            {/* ================= LOADING ================= */}

            {loading ? (

              <div
                className="text-center py-5"
              >

                <div
                  className="spinner-border"
                  role="status"
                  style={{
                    color: "#8B0000",
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                >

                  <span className="visually-hidden">
                    Loading...
                  </span>

                </div>

                <p className="text-muted mt-3 mb-0">
                  Loading your orders...
                </p>

              </div>

            ) : orders.length > 0 ? (

              <div className="table-responsive">

                <table
                  className="table align-middle mb-0"
                  style={{
                    minWidth: "750px",
                  }}
                >

                  <thead
                    style={{
                      background: "#fafafa",
                    }}
                  >

                    <tr>

                      <th
                        className="px-4 py-3"
                        style={{
                          color: "#777",
                          fontSize: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        ORDER
                      </th>

                      <th
                        className="py-3"
                        style={{
                          color: "#777",
                          fontSize: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        DATE
                      </th>

                      <th
                        className="py-3"
                        style={{
                          color: "#777",
                          fontSize: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        TOTAL AMOUNT
                      </th>

                      <th
                        className="py-3"
                        style={{
                          color: "#777",
                          fontSize: "12px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        STATUS
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {orders.map((order) => {

                      const statusStyle =
                        getStatusStyle(order.status);

                      return (

                        <tr
                          key={order.id}
                          style={{
                            transition:
                              "background 0.2s ease",
                          }}
                        >

                          {/* ORDER */}

                          <td className="px-4">

                            <div className="d-flex align-items-center">

                              <div
                                className="d-flex align-items-center justify-content-center me-3"
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  borderRadius: "11px",
                                  background: "#fff1f1",
                                  color: "#8B0000",
                                }}
                              >

                                <i className="bi bi-receipt fs-5"></i>

                              </div>

                              <div>

                                <div
                                  className="fw-bold"
                                  style={{
                                    color: "#222",
                                    fontSize: "14px",
                                  }}
                                >

                                  #{order.id}

                                </div>

                                <small className="text-muted">
                                  Pizza Order
                                </small>

                              </div>

                            </div>

                          </td>


                          {/* DATE */}

                          <td>

                            {order.orderDate ? (

                              <div>

                                <div
                                  className="fw-semibold"
                                  style={{
                                    color: "#333",
                                    fontSize: "13px",
                                  }}
                                >

                                  {new Date(
                                    order.orderDate
                                  ).toLocaleDateString(
                                    undefined,
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}

                                </div>

                                <small className="text-muted">

                                  {new Date(
                                    order.orderDate
                                  ).toLocaleTimeString(
                                    undefined,
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}

                                </small>

                              </div>

                            ) : (

                              "-"

                            )}

                          </td>


                          {/* TOTAL */}

                          <td>

                            <div>

                              <div
                                className="fw-bold"
                                style={{
                                  color: "#222",
                                  fontSize: "14px",
                                }}
                              >

                                TZS{" "}
                                {Number(
                                  order.totalAmount || 0
                                ).toLocaleString()}

                              </div>

                              <small className="text-muted">
                                Cash on Delivery
                              </small>

                            </div>

                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className="d-inline-flex align-items-center"
                              style={{
                                background:
                                  statusStyle.background,
                                color:
                                  statusStyle.color,
                                padding:
                                  "7px 12px",
                                borderRadius:
                                  "20px",
                                fontSize:
                                  "11px",
                                fontWeight:
                                  "700",
                                whiteSpace:
                                  "nowrap",
                              }}
                            >

                              <i
                                className={`bi ${statusStyle.icon} me-2`}
                              ></i>

                              {getStatusLabel(
                                order.status
                              )}

                            </span>

                          </td>

                        </tr>

                      );

                    })}

                  </tbody>

                </table>

              </div>

            ) : (

              /* ================= EMPTY STATE ================= */

              <div
                className="text-center py-5 px-3"
              >

                <div
                  className="d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "20px",
                    background: "#fff1f1",
                    color: "#8B0000",
                  }}
                >

                  <i
                    className="bi bi-bag-x fs-1"
                  ></i>

                </div>

                <h5 className="fw-bold mb-2">
                  No Orders Found
                </h5>

                <p className="text-muted mb-0">
                  You haven't placed any orders yet.
                </p>

              </div>

            )}


            {/* ================= PAGINATION ================= */}

            {totalPages > 1 && (

              <div
                className="d-flex justify-content-between align-items-center px-4 py-3 flex-wrap gap-3"
                style={{
                  borderTop:
                    "1px solid #eeeeee",
                }}
              >

                {/* PAGE INFO */}

                <small className="text-muted">

                  Page{" "}
                  <strong>
                    {page + 1}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {totalPages}
                  </strong>

                </small>


                {/* BUTTONS */}

                <div className="d-flex align-items-center">

                  <button
                    className="btn btn-sm me-2"
                    disabled={page === 0}
                    onClick={() =>
                      setPage(page - 1)
                    }
                    style={{
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "8px",
                      background:
                        page === 0
                          ? "#f1f1f1"
                          : "#fff",
                      color:
                        page === 0
                          ? "#aaa"
                          : "#555",
                      padding:
                        "7px 12px",
                    }}
                  >

                    <i className="bi bi-chevron-left me-1"></i>

                    Previous

                  </button>


                  {[...Array(totalPages)].map(
                    (_, index) => (

                      <button
                        key={index}
                        onClick={() =>
                          setPage(index)
                        }
                        className="btn btn-sm mx-1"
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "8px",
                          border:
                            page === index
                              ? "none"
                              : "1px solid #ddd",
                          background:
                            page === index
                              ? "#8B0000"
                              : "#fff",
                          color:
                            page === index
                              ? "#fff"
                              : "#555",
                          fontWeight:
                            "600",
                        }}
                      >

                        {index + 1}

                      </button>

                    )
                  )}


                  <button
                    className="btn btn-sm ms-2"
                    disabled={
                      page ===
                      totalPages - 1
                    }
                    onClick={() =>
                      setPage(page + 1)
                    }
                    style={{
                      border:
                        "1px solid #ddd",
                      borderRadius:
                        "8px",
                      background:
                        page ===
                        totalPages - 1
                          ? "#f1f1f1"
                          : "#fff",
                      color:
                        page ===
                        totalPages - 1
                          ? "#aaa"
                          : "#555",
                      padding:
                        "7px 12px",
                    }}
                  >

                    Next

                    <i className="bi bi-chevron-right ms-1"></i>

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Orders;