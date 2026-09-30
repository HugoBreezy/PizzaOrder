import { useEffect, useState } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getPaidPayments } from "../services/api";

function AdminTopbar() {

  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState(0);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fullName = user?.fullName || "Administrator";

  const role = user?.role || "ADMIN";

  const initials = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);


  // ==========================================
  // LOAD PAYMENT NOTIFICATIONS
  // ==========================================

  useEffect(() => {

    loadNotifications();

    const interval = setInterval(() => {

      loadNotifications();

    }, 5000);

    return () => clearInterval(interval);

  }, []);


  const loadNotifications = async () => {

    try {

      const response = await getPaidPayments();

      const paidPayments = response.data || [];


      // ==========================================
      // GET PAYMENTS ALREADY SEEN
      // ==========================================

      const storedSeenPayments =
        JSON.parse(
          localStorage.getItem("adminSeenPayments") || "[]"
        );


      const seenPayments = Array.isArray(storedSeenPayments)
        ? storedSeenPayments
        : [];


      // ==========================================
      // FIRST TIME ADMIN OPENS SYSTEM
      // ==========================================

      if (!localStorage.getItem("adminNotificationsInitialized")) {

        const allPaidIds = paidPayments
          .map((payment) => payment.id)
          .filter(Boolean);

        localStorage.setItem(
          "adminSeenPayments",
          JSON.stringify(allPaidIds)
        );

        localStorage.setItem(
          "adminNotificationsInitialized",
          "true"
        );

        setNotifications(0);

        return;
      }


      // ==========================================
      // FIND NEW PAID PAYMENTS
      // ==========================================

      const newPayments = paidPayments.filter(
        (payment) =>
          payment.id &&
          !seenPayments.includes(payment.id)
      );


      // ==========================================
      // SHOW NUMBER OF NEW PAYMENTS
      // ==========================================

      setNotifications(newPayments.length);

    } catch (error) {

      console.log(
        "Failed to load payment notifications:",
        error
      );

    }

  };


  // ==========================================
  // HANDLE NOTIFICATION CLICK
  // ==========================================

  const handleNotificationClick = async () => {

    try {

      const response = await getPaidPayments();

      const paidPayments = response.data || [];

      const allPaidIds = paidPayments
        .map((payment) => payment.id)
        .filter(Boolean);


      // Mark all current payments as seen

      localStorage.setItem(
        "adminSeenPayments",
        JSON.stringify(allPaidIds)
      );


      // Remove notification badge

      setNotifications(0);


      // Go to Payment History

      navigate("/admin/payments");

    } catch (error) {

      console.log(error);

      navigate("/admin/payments");

    }

  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });

  };


  return (

    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "2px solid #8B0000",
      }}
    >

      {/* ======================================
          LEFT
      ====================================== */}

      <div>

        <h3
          className="fw-bold mb-1"
          style={{
            color: "#8B0000",
          }}
        >
          Dashboard
        </h3>

        <small className="text-muted">
          Welcome back, {fullName} 👋
        </small>

      </div>


      {/* ======================================
          RIGHT
      ====================================== */}

      <div className="d-flex align-items-center">


        {/* ====================================
            NOTIFICATION
        ==================================== */}

        <div
          className="position-relative me-4"
          style={{
            cursor: "pointer",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleNotificationClick}
          title={
            notifications > 0
              ? `${notifications} new payment`
              : "No new notifications"
          }
        >

          <FaBell
            size={22}
            color="#8B0000"
          />


          {/* ==================================
              NOTIFICATION BADGE
          ================================== */}

          {notifications > 0 && (

            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{
                fontSize: "10px",
                minWidth: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 5px",
                border: "2px solid white",
              }}
            >

              {notifications > 99
                ? "99+"
                : notifications}

            </span>

          )}

        </div>


        {/* ====================================
            PROFILE
        ==================================== */}

        <div className="position-relative">

          <div
            className="d-flex align-items-center"
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setShowMenu(!showMenu)
            }
          >

            {/* PROFILE INITIALS */}

            <div
              className="rounded-circle d-flex justify-content-center align-items-center me-3"
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#8B0000",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >

              {initials}

            </div>


            {/* USER INFORMATION */}

            <div>

              <h6 className="mb-0 fw-bold">
                {fullName}
              </h6>

              <small className="text-muted">
                {role}
              </small>

            </div>


            {/* ARROW */}

            <FaChevronDown
              className="ms-3"
              color="#8B0000"
            />

          </div>


          {/* ==================================
              PROFILE DROPDOWN
          ================================== */}

          {showMenu && (

            <div
              className="card shadow border-0 position-absolute end-0 mt-2"
              style={{
                width: "190px",
                borderRadius: "12px",
                overflow: "hidden",
                zIndex: 999,
              }}
            >

              <div
                className="px-3 py-3 border-bottom"
              >

                <div className="fw-bold">
                  {fullName}
                </div>

                <small className="text-muted">
                  {role}
                </small>

              </div>


              {/* LOGOUT */}

              <button
                className="btn d-flex align-items-center w-100 text-start py-3"
                onClick={handleLogout}
                style={{
                  borderRadius: 0,
                }}
              >

                <IoLogOutOutline
                  size={22}
                  className="me-2 text-danger"
                />

                <span className="fw-semibold">
                  Logout
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default AdminTopbar;