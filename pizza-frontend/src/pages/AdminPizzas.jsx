import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { getAllPizzas, deletePizza } from "../services/api";

function AdminPizzas() {

  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    loadPizzas();
  }, []);

  const loadPizzas = async () => {
    try {

      const response = await getAllPizzas();

      setPizzas(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load pizzas.");

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pizza?"
    );

    if (!confirmDelete) return;

    try {

      await deletePizza(id);

      toast.success("Pizza deleted successfully!");

      loadPizzas();

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete pizza.");

    }
  };

  const getStatusStyle = (status) => {

    if (status === "AVAILABLE") {

      return {
        background: "#d1e7dd",
        color: "#146c43",
      };

    }

    return {
      background: "#f8d7da",
      color: "#b02a37",
    };
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
      <div
        className="flex-grow-1"
        style={{
          minWidth: 0,
        }}
      >

        <AdminTopbar />

        <main className="container-fluid px-4 py-4">

          {/* PAGE HEADER */}
          <div
            className="d-flex justify-content-between align-items-center mb-4"
          >

            <div>

              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#8B0000",
                  letterSpacing: "-0.5px",
                }}
              >
                Manage Pizzas
              </h2>

              <p className="text-muted mb-0">
                Manage your pizza menu and availability
              </p>

            </div>

            <Link
              to="/admin/pizzas/add"
              className="text-decoration-none"
            >

              <button
                className="btn"
                style={{
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "9px 17px",
                  fontWeight: "600",
                  boxShadow:
                    "0 5px 15px rgba(220,53,69,0.20)",
                }}
              >

                <i className="bi bi-plus-lg me-2"></i>

                Add Pizza

              </button>

            </Link>

          </div>

          {/* PIZZA CARD */}
          <div
            className="card border-0"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "#fff",
              boxShadow:
                "0 8px 30px rgba(0,0,0,0.07)",
            }}
          >

            {/* CARD HEADER */}
            <div
              className="px-4 py-3 d-flex justify-content-between align-items-center"
              style={{
                borderBottom: "1px solid #eeeeee",
              }}
            >

              <div>

                <h5
                  className="fw-bold mb-1"
                  style={{
                    color: "#222",
                  }}
                >
                  Pizza List
                </h5>

                <small className="text-muted">
                  {pizzas.length} pizza
                  {pizzas.length !== 1 ? "s" : ""} available in the system
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

                <i className="bi bi-shop fs-5"></i>

              </div>

            </div>

            {/* TABLE */}
            <div className="table-responsive">

              <table
                className="table align-middle mb-0"
                style={{
                  minWidth: "850px",
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
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      ID
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      IMAGE
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      PIZZA NAME
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      SIZE
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      PRICE
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      STATUS
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {pizzas.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >

                        <i
                          className="bi bi-pizza"
                          style={{
                            fontSize: "42px",
                            color: "#ccc",
                          }}
                        ></i>

                        <p className="text-muted mt-2 mb-0">
                          No pizzas found.
                        </p>

                      </td>

                    </tr>

                  ) : (

                    pizzas.map((pizza) => (

                      <tr
                        key={pizza.id}
                        style={{
                          transition:
                            "background 0.2s ease",
                        }}
                      >

                        {/* ID */}
                        <td className="px-4">

                          <div
                            className="d-inline-flex align-items-center justify-content-center"
                            style={{
                              width: "38px",
                              height: "34px",
                              borderRadius: "9px",
                              background: "#fff1f1",
                              color: "#8B0000",
                              fontWeight: "700",
                              fontSize: "13px",
                            }}
                          >
                            #{pizza.id}
                          </div>

                        </td>

                        {/* IMAGE */}
                        <td>

                          <div
                            style={{
                              width: "62px",
                              height: "62px",
                              borderRadius: "13px",
                              overflow: "hidden",
                              background: "#f5f5f5",
                              border:
                                "1px solid #eeeeee",
                            }}
                          >

                            <img
                              src={`http://localhost:8080${pizza.image}`}
                              alt={pizza.pizzaName}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/70?text=No+Image";
                              }}
                            />

                          </div>

                        </td>

                        {/* PIZZA NAME */}
                        <td>

                          <div
                            className="fw-bold"
                            style={{
                              color: "#222",
                              fontSize: "14px",
                            }}
                          >
                            {pizza.pizzaName}
                          </div>

                          <small className="text-muted">
                            Pizza
                          </small>

                        </td>

                        {/* SIZE */}
                        <td>

                          <span
                            style={{
                              background: "#f5f5f5",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#555",
                            }}
                          >
                            {pizza.size}
                          </span>

                        </td>

                        {/* PRICE */}
                        <td>

                          <span
                            className="fw-bold"
                            style={{
                              color: "#222",
                              fontSize: "13px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            TZS{" "}
                            {Number(
                              pizza.price || 0
                            ).toLocaleString()}
                          </span>

                        </td>

                        {/* STATUS */}
                        <td>

                          <span
                            className="badge"
                            style={{
                              background:
                                getStatusStyle(
                                  pizza.status
                                ).background,
                              color:
                                getStatusStyle(
                                  pizza.status
                                ).color,
                              padding:
                                "7px 11px",
                              borderRadius:
                                "20px",
                              fontSize: "10px",
                              fontWeight: "700",
                            }}
                          >
                            <i
                              className={`bi ${
                                pizza.status ===
                                "AVAILABLE"
                                  ? "bi-check-circle-fill"
                                  : "bi-x-circle-fill"
                              } me-1`}
                            ></i>

                            {pizza.status}
                          </span>

                        </td>

                        {/* ACTION */}
                        <td>

                          <div className="d-flex gap-2">

                            {/* EDIT */}
                            <Link
                              to={`/admin/pizzas/edit/${pizza.id}`}
                              className="text-decoration-none"
                            >

                              <button
                                className="btn btn-sm"
                                style={{
                                  width: "38px",
                                  height: "36px",
                                  borderRadius:
                                    "9px",
                                  background:
                                    "#0d6efd",
                                  color: "#fff",
                                  border: "none",
                                }}
                                title="Edit Pizza"
                              >

                                <i className="bi bi-pencil-square"></i>

                              </button>

                            </Link>

                            {/* DELETE */}
                            <button
                              className="btn btn-sm"
                              onClick={() =>
                                handleDelete(
                                  pizza.id
                                )
                              }
                              style={{
                                width: "38px",
                                height: "36px",
                                borderRadius: "9px",
                                background:
                                  "#dc3545",
                                color: "#fff",
                                border: "none",
                              }}
                              title="Delete Pizza"
                            >

                              <i className="bi bi-trash3"></i>

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminPizzas;