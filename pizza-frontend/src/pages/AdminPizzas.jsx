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

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2
              className="fw-bold"
              style={{
                color: "#8B0000",
              }}
            >
              Manage Pizzas
            </h2>

            <Link
              to="/admin/pizzas/add"
              className="btn btn-danger"
            >

              <i className="bi bi-plus-circle me-2"></i>

              Add Pizza

            </Link>

          </div>

          <div className="card shadow border-0">

            <div
              className="card-header text-white"
              style={{
                backgroundColor: "#8B0000",
              }}
            >

              <h5 className="mb-0">

                Pizza List

              </h5>

            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Image</th>
                    <th>Pizza Name</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {pizzas.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center fw-bold"
                      >
                        No pizzas found.
                      </td>

                    </tr>

                  ) : (

                    pizzas.map((pizza) => (

                      <tr key={pizza.id}>

                        <td>{pizza.id}</td>

                        <td>

                          <img
                            src={`http://localhost:8080${pizza.image}`}
                            alt={pizza.pizzaName}
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/70?text=No+Image";
                            }}
                          />

                        </td>

                        <td>{pizza.pizzaName}</td>

                        <td>{pizza.size}</td>

                        <td>

                          TZS {pizza.price.toLocaleString()}

                        </td>

                        <td>

                          <span
                            className={`badge ${
                              pizza.status === "AVAILABLE"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >

                            {pizza.status}

                          </span>

                        </td>

                        <td>

                          <Link
                            to={`/admin/pizzas/edit/${pizza.id}`}
                            className="btn btn-primary btn-sm me-2"
                          >

                            <i className="bi bi-pencil-square"></i>

                          </Link>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(pizza.id)}
                          >

                            <i className="bi bi-trash"></i>

                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminPizzas;