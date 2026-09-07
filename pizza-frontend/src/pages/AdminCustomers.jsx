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

  // Statistics

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    customer => customer.status === "ACTIVE"
  ).length;

  const inactiveCustomers = customers.filter(
    customer => customer.status === "INACTIVE"
  ).length;

  // Pagination Logic

  const lastIndex = currentPage * customersPerPage;

  const firstIndex = lastIndex - customersPerPage;

  const currentCustomers = filteredCustomers.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );

  return (    <div
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

          <h2
            className="fw-bold mb-4"
            style={{
              color: "#8B0000",
            }}
          >

            Manage Customers

          </h2>

          {/* Statistics Cards */}

          <div className="row mb-4">

            <div className="col-lg-4 mb-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6 className="text-muted">
                    Total Customers
                  </h6>

                  <h2
                    className="fw-bold"
                    style={{
                      color: "#8B0000",
                    }}
                  >

                    {totalCustomers}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-lg-4 mb-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6 className="text-success">
                    Active Customers
                  </h6>

                  <h2 className="fw-bold text-success">

                    {activeCustomers}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-lg-4 mb-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6 className="text-danger">
                    Inactive Customers
                  </h6>

                  <h2 className="fw-bold text-danger">

                    {inactiveCustomers}

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="row mb-4">

            <div className="col-lg-5">

              <input
                type="text"
                className="form-control"
                placeholder="Search customer by name or email..."
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* Table */}

          <div className="table-responsive">

            <table className="table table-hover bg-white shadow">

              <thead
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                }}
              >

                <tr>

                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>

              </thead>

              <tbody>
                                {currentCustomers.length > 0 ? (

                  currentCustomers.map((customer, index) => (

                    <tr key={customer.id}>

                      <td>

                        {firstIndex + index + 1}

                      </td>

                      <td>

                        {customer.fullName}

                      </td>

                      <td>

                        {customer.email}

                      </td>

                      <td>

                        {customer.phone}

                      </td>

                      <td>

                        <span
                          className={`badge ${
                            customer.status === "ACTIVE"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >

                          {customer.status}

                        </span>

                      </td>

                      <td>

                        <button
                          onClick={() => handleStatus(customer)}
                          className={`btn btn-sm ${
                            customer.status === "ACTIVE"
                              ? "btn-danger"
                              : "btn-success"
                          }`}
                        >

                          {customer.status === "ACTIVE"
                            ? "Deactivate"
                            : "Activate"}

                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center fw-bold"
                    >

                      No Customers Found

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
                className="btn btn-outline-secondary me-2"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >

                Previous

              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (

                  <button
                    key={index}
                    className={`btn mx-1 ${
                      currentPage === index + 1
                        ? "btn-danger"
                        : "btn-outline-danger"
                    }`}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >

                    {index + 1}

                  </button>

                )
              )}

              <button
                className="btn btn-outline-secondary ms-2"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >

                Next

              </button>

            </div>

          )}

        </div>

      </div>
      

    </div>

  );

}

export default AdminCustomers;