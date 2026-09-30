import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";

import {
  getAllUsers,
  activateCustomer,
  deactivateCustomer,
} from "../services/api";

function AdminCustomers() {

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {

    try {

      const response = await getAllUsers();

      const onlyCustomers = response.data.filter(
        user => user.role === "CUSTOMER"
      );

      setCustomers(onlyCustomers);
      setFilteredCustomers(onlyCustomers);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load customers.");

    }

  };

  const handleSearch = (value) => {

    setSearch(value);

    const result = customers.filter(customer =>

      customer.fullName
        .toLowerCase()
        .includes(value.toLowerCase())

      ||

      customer.email
        .toLowerCase()
        .includes(value.toLowerCase())

    );

    setFilteredCustomers(result);
    setCurrentPage(1);

  };

  const handleStatus = async (customer) => {

    try {

      if (customer.status === "ACTIVE") {

        await deactivateCustomer(customer.id);

        toast.success("Customer Deactivated");

      } else {

        await activateCustomer(customer.id);

        toast.success("Customer Activated");

      }

      loadCustomers();

    } catch (error) {

      console.log(error);

      toast.error("Operation Failed");

    }

  };

  // =========================
  // STATISTICS
  // =========================

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    customer => customer.status === "ACTIVE"
  ).length;

  const inactiveCustomers = customers.filter(
    customer => customer.status === "INACTIVE"
  ).length;

  // =========================
  // PAGINATION
  // =========================

  const lastIndex = currentPage * customersPerPage;

  const firstIndex = lastIndex - customersPerPage;

  const currentCustomers = filteredCustomers.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  // =========================
  // CUSTOMER INITIAL
  // =========================

  const getInitial = (name) => {

    if (!name) return "U";

    return name.charAt(0).toUpperCase();

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
                Manage Customers
              </h2>

              <p className="text-muted mb-0">
                Manage registered customers and account status
              </p>

            </div>

            <div
              className="d-none d-md-flex align-items-center px-3 py-2"
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow:
                  "0 5px 20px rgba(0,0,0,0.06)",
                fontSize: "14px",
                color: "#666",
              }}
            >

              <i
                className="bi bi-people-fill me-2"
                style={{
                  color: "#8B0000",
                }}
              ></i>

              {totalCustomers} Customers

            </div>

          </div>

          {/* =========================
              STATISTICS
          ========================= */}

          <div className="row g-4 mb-4">

            {/* TOTAL */}
            <div className="col-lg-4 col-md-6">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "18px",
                  background: "#fff",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.07)",
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>

                      <div
                        className="text-muted mb-2"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Total Customers
                      </div>

                      <div
                        className="fw-bold"
                        style={{
                          fontSize: "30px",
                          color: "#8B0000",
                        }}
                      >
                        {totalCustomers}
                      </div>

                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "15px",
                        background: "#fff1f1",
                        color: "#8B0000",
                        fontSize: "22px",
                      }}
                    >

                      <i className="bi bi-people-fill"></i>

                    </div>

                  </div>

                </div>

                <div
                  style={{
                    height: "4px",
                    background: "#8B0000",
                  }}
                ></div>

              </div>

            </div>

            {/* ACTIVE */}
            <div className="col-lg-4 col-md-6">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "18px",
                  background: "#fff",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.07)",
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>

                      <div
                        className="mb-2"
                        style={{
                          color: "#198754",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Active Customers
                      </div>

                      <div
                        className="fw-bold"
                        style={{
                          fontSize: "30px",
                          color: "#198754",
                        }}
                      >
                        {activeCustomers}
                      </div>

                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "15px",
                        background: "#eaf7ef",
                        color: "#198754",
                        fontSize: "22px",
                      }}
                    >

                      <i className="bi bi-person-check-fill"></i>

                    </div>

                  </div>

                </div>

                <div
                  style={{
                    height: "4px",
                    background: "#198754",
                  }}
                ></div>

              </div>

            </div>

            {/* INACTIVE */}
            <div className="col-lg-4 col-md-6">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "18px",
                  background: "#fff",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.07)",
                }}
              >

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>

                      <div
                        className="mb-2"
                        style={{
                          color: "#dc3545",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Inactive Customers
                      </div>

                      <div
                        className="fw-bold"
                        style={{
                          fontSize: "30px",
                          color: "#dc3545",
                        }}
                      >
                        {inactiveCustomers}
                      </div>

                    </div>

                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "15px",
                        background: "#fff0f1",
                        color: "#dc3545",
                        fontSize: "22px",
                      }}
                    >

                      <i className="bi bi-person-x-fill"></i>

                    </div>

                  </div>

                </div>

                <div
                  style={{
                    height: "4px",
                    background: "#dc3545",
                  }}
                ></div>

              </div>

            </div>

          </div>

          {/* =========================
              CUSTOMER TABLE CARD
          ========================= */}

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
              className="px-4 py-3"
              style={{
                borderBottom:
                  "1px solid #eeeeee",
              }}
            >

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h5
                    className="fw-bold mb-1"
                    style={{
                      color: "#222",
                    }}
                  >
                    Customer List
                  </h5>

                  <small className="text-muted">
                    View and manage customer accounts
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

                  <i className="bi bi-person-lines-fill fs-5"></i>

                </div>

              </div>

              {/* SEARCH */}
              <div
                className="mt-3"
                style={{
                  maxWidth: "500px",
                }}
              >

                <div
                  className="position-relative"
                >

                  <i
                    className="bi bi-search position-absolute"
                    style={{
                      left: "14px",
                      top: "11px",
                      color: "#999",
                      fontSize: "14px",
                    }}
                  ></i>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search customer by name or email..."
                    value={search}
                    onChange={(e) =>
                      handleSearch(e.target.value)
                    }
                    style={{
                      height: "40px",
                      borderRadius: "10px",
                      paddingLeft: "40px",
                      border:
                        "1px solid #e1e1e1",
                      fontSize: "13px",
                      boxShadow: "none",
                    }}
                  />

                </div>

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
                      #
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      CUSTOMER
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      EMAIL
                    </th>

                    <th
                      className="py-3 text-muted"
                      style={{
                        fontSize: "12px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      PHONE
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

                  {currentCustomers.length > 0 ? (

                    currentCustomers.map(
                      (customer, index) => {

                        const isActive =
                          customer.status ===
                          "ACTIVE";

                        return (

                          <tr key={customer.id}>

                            {/* NUMBER */}
                            <td className="px-4">

                              <div
                                className="d-inline-flex align-items-center justify-content-center"
                                style={{
                                  width: "34px",
                                  height: "32px",
                                  borderRadius: "8px",
                                  background: "#f7f7f7",
                                  color: "#666",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                }}
                              >
                                {firstIndex + index + 1}
                              </div>

                            </td>

                            {/* CUSTOMER */}
                            <td>

                              <div
                                className="d-flex align-items-center"
                              >

                                <div
                                  className="d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    borderRadius:
                                      "50%",
                                    background:
                                      "linear-gradient(135deg, #8B0000, #c0392b)",
                                    color: "#fff",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                  }}
                                >
                                  {getInitial(
                                    customer.fullName
                                  )}
                                </div>

                                <div>

                                  <div
                                    className="fw-semibold"
                                    style={{
                                      color: "#222",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {customer.fullName}
                                  </div>

                                  <small className="text-muted">
                                    Customer
                                  </small>

                                </div>

                              </div>

                            </td>

                            {/* EMAIL */}
                            <td>

                              <span
                                style={{
                                  fontSize: "13px",
                                  color: "#444",
                                }}
                              >
                                {customer.email}
                              </span>

                            </td>

                            {/* PHONE */}
                            <td>

                              <div
                                className="d-flex align-items-center"
                                style={{
                                  fontSize: "13px",
                                  color: "#444",
                                }}
                              >

                                <i
                                  className="bi bi-telephone me-2"
                                  style={{
                                    color: "#8B0000",
                                  }}
                                ></i>

                                {customer.phone}

                              </div>

                            </td>

                            {/* STATUS */}
                            <td>

                              <span
                                className="badge"
                                style={{
                                  background:
                                    isActive
                                      ? "#d1e7dd"
                                      : "#f8d7da",
                                  color:
                                    isActive
                                      ? "#146c43"
                                      : "#b02a37",
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
                                    isActive
                                      ? "bi-check-circle-fill"
                                      : "bi-x-circle-fill"
                                  } me-1`}
                                ></i>

                                {customer.status}

                              </span>

                            </td>

                            {/* ACTION */}
                            <td>

                              <button
                                onClick={() =>
                                  handleStatus(
                                    customer
                                  )
                                }
                                className="btn btn-sm"
                                style={{
                                  height: "34px",
                                  borderRadius: "8px",
                                  padding:
                                    "4px 12px",
                                  border: "none",
                                  background:
                                    isActive
                                      ? "#dc3545"
                                      : "#198754",
                                  color: "#fff",
                                  fontSize: "11px",
                                  fontWeight: "600",
                                }}
                              >

                                <i
                                  className={`bi ${
                                    isActive
                                      ? "bi-person-dash"
                                      : "bi-person-check"
                                  } me-1`}
                                ></i>

                                {isActive
                                  ? "Deactivate"
                                  : "Activate"}

                              </button>

                            </td>

                          </tr>

                        );

                      }
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-5"
                      >

                        <i
                          className="bi bi-people"
                          style={{
                            fontSize: "42px",
                            color: "#ccc",
                          }}
                        ></i>

                        <p className="text-muted mt-2 mb-0">
                          No Customers Found
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (

              <div
                className="d-flex justify-content-between align-items-center px-4 py-3"
                style={{
                  borderTop:
                    "1px solid #eeeeee",
                }}
              >

                <button
                  className="btn btn-sm"
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                  style={{
                    border:
                      "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "#555",
                    padding:
                      "7px 13px",
                    fontSize: "12px",
                  }}
                >

                  <i className="bi bi-chevron-left me-1"></i>

                  Previous

                </button>

                <div className="d-flex align-items-center">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => (

                      <button
                        key={index}
                        className="btn btn-sm mx-1"
                        onClick={() =>
                          setCurrentPage(
                            index + 1
                          )
                        }
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius:
                            "8px",
                          border:
                            currentPage ===
                            index + 1
                              ? "none"
                              : "1px solid #ddd",
                          background:
                            currentPage ===
                            index + 1
                              ? "#8B0000"
                              : "#fff",
                          color:
                            currentPage ===
                            index + 1
                              ? "#fff"
                              : "#555",
                          fontWeight: "600",
                          fontSize: "12px",
                        }}
                      >
                        {index + 1}
                      </button>

                    )
                  )}

                </div>

                <button
                  className="btn btn-sm"
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                  style={{
                    border:
                      "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fff",
                    color: "#555",
                    padding:
                      "7px 13px",
                    fontSize: "12px",
                  }}
                >

                  Next

                  <i className="bi bi-chevron-right ms-1"></i>

                </button>

              </div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminCustomers;