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

  return (

    <>

      <Navbar />

      <section
        className="py-5"
        style={{
          backgroundColor: "#F8F4F0",
          minHeight: "80vh",
        }}
      >

        <div className="container">

          <h2
            className="fw-bold mb-4"
            style={{
              color: "#8B0000",
            }}
          >

            My Orders

          </h2>

          <div className="table-responsive">

            <table className="table table-bordered table-hover bg-white shadow">

              <thead
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                }}
              >

                <tr>

                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-5"
                    >

                      Loading...

                    </td>

                  </tr>

                ) : orders.length > 0 ? (

                  orders.map((order) => (

                    <tr key={order.id}>

                      <td>

                        #{order.id}

                      </td>

                      <td>

                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleString()
                          : "-"}

                      </td>

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
                              : order.status === "DELIVERED"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >

                          {order.status}

                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center fw-bold"
                    >

                      No Orders Found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>
                      </div>

          {/* Pagination */}

          {totalPages > 1 && (

            <div className="d-flex justify-content-center align-items-center mt-4">

              <button
                className="btn btn-outline-danger me-2"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >

                ← Previous

              </button>

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`btn mx-1 ${
                    page === index
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                >

                  {index + 1}

                </button>

              ))}

              <button
                className="btn btn-outline-danger ms-2"
                disabled={page === totalPages - 1}
                onClick={() => setPage(page + 1)}
              >

                Next →

              </button>

            </div>

          )}

        </div>

      </section>

      <Footer />

    </>

  );

}

export default Orders;