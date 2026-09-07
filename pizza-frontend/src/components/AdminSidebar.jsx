import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminSidebar() {

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "speedometer2",
    },
    {
      name: "Manage Customers",
      path: "/admin/customers",
      icon: "people-fill",
    },
    {
      name: "Manage Pizzas",
      path: "/admin/pizzas",
      icon: "shop",
    },
    {
      name: "Manage Orders",
      path: "/admin/orders",
      icon: "bag-check-fill",
    },
    {
      name: "Confirm Payments",
      path: "/admin/payments",
      icon: "cash-coin",
    },
  ];

  return (

    <div
      className="d-flex flex-column shadow-lg"
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#8B0000",
      }}
    >

      {/* Logo */}

      <div className="text-center py-4">

        <img
          src={logo}
          alt="Logo"
          style={{
            width: "95px",
            height: "95px",
            borderRadius: "50%",
            backgroundColor: "white",
            padding: "8px",
            objectFit: "contain",
          }}
        />

        <h3 className="fw-bold text-white mt-3">
          Pizza Admin
        </h3>

        <small className="text-light">
          Management System
        </small>

      </div>

      <hr className="text-light m-0" />

      {/* Menu */}

      <div className="p-3">

        {menuItems.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className={`d-flex align-items-center text-decoration-none mb-3 px-3 py-3 ${
              location.pathname === item.path
                ? "bg-white text-dark"
                : "text-white"
            }`}
            style={{
              borderRadius: "14px",
              transition: "0.3s",
              fontWeight: "600",
            }}
          >

            <i
              className={`bi bi-${item.icon} fs-5 me-3`}
            ></i>

            {item.name}

          </Link>

        ))}

      </div>

    </div>

  );

}

export default AdminSidebar;