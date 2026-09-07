import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
  return (
    <footer
      className="text-light pt-5 pb-3"
      style={{ backgroundColor: "#8B0000" }}
    >
      <div className="container">

        <div className="row">

          {/* Logo & About */}

          <div className="col-lg-4 mb-4">

            <div className="d-flex align-items-center mb-3">

              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "60px",
                  marginRight: "15px"
                }}
              />

              <h4 className="fw-bold mb-0">
                Pizza Ordering System
              </h4>

            </div>

            <p>
              We serve fresh, delicious and high-quality pizzas
              with fast delivery and excellent customer service.
            </p>

          </div>

          {/* Quick Links */}

          <div className="col-lg-3 mb-4">

            <h5 className="fw-bold mb-3">
              Quick Links
            </h5>

            <p>
              <Link
                to="/"
                className="text-light text-decoration-none"
              >
                Home
              </Link>
            </p>

            <p>
              <Link
                to="/menu"
                className="text-light text-decoration-none"
              >
                Menu
              </Link>
            </p>

            <p>
              <Link
                to="/login"
                className="text-light text-decoration-none"
              >
                Login
              </Link>
            </p>

            <p>
              <Link
                to="/register"
                className="text-light text-decoration-none"
              >
                Register
              </Link>
            </p>

          </div>

          {/* Contact */}

          <div className="col-lg-3 mb-4">

            <h5 className="fw-bold mb-3">
              Contact Us
            </h5>

            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Dar es Salaam, Tanzania
            </p>

            <p>
              <i className="bi bi-telephone-fill me-2"></i>
              +255 712 345 678
            </p>

            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              pizza@gmail.com
            </p>

          </div>

          {/* Social */}

          <div className="col-lg-2 mb-4">

            <h5 className="fw-bold mb-3">
              Follow Us
            </h5>

            <div className="d-flex gap-3 fs-3">

              <i className="bi bi-facebook"></i>

              <i className="bi bi-instagram"></i>

              <i className="bi bi-whatsapp"></i>

            </div>

          </div>

        </div>

        <hr className="border-light" />

        <div className="text-center">

          © 2026 Pizza Ordering System | All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}

export default Footer;