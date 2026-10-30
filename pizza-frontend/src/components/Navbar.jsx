import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../assets/images/logo.png";
import * as bootstrap from "bootstrap";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {

    loadNavbar();

    const interval = setInterval(loadNavbar, 500);

    return () => clearInterval(interval);

  }, []);

  const loadNavbar = () => {

    const loggedUser =
      JSON.parse(localStorage.getItem("user"));

    setUser(loggedUser);

    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartItems);

    const grandTotal = cartItems.reduce(

      (sum, item) =>

        sum + item.price * item.quantity,

      0

    );

    setTotal(grandTotal);

  };

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    navigate("/login");

  };
  const saveCart = (items) => {

  setCart(items);

  localStorage.setItem("cart", JSON.stringify(items));

  const grandTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  setTotal(grandTotal);

};

const increaseQuantity = (id) => {

  const updated = cart.map((item) =>
    item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  saveCart(updated);

};

const decreaseQuantity = (id) => {

  const updated = cart
    .map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  saveCart(updated);

};

const removeItem = (id) => {

  const updated = cart.filter(
    (item) => item.id !== id
  );

  saveCart(updated);

};

const clearCart = () => {

  if (!window.confirm("Clear all items?")) return;

  saveCart([]);

};

  return (

    <>

      <nav
        className="navbar navbar-expand-lg sticky-top shadow"
        style={{
          backgroundColor: "#8B0000",
        }}
      >

        <div className="container">

          {/* Logo */}

          <Link
            className="navbar-brand d-flex align-items-center fw-bold text-white"
            to="/"
          >

            <img
              src={logo}
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                marginRight: "10px",
              }}
            />

            <span className="fs-4">

              Pizza Ordering System

            </span>

          </Link>

          {/* Mobile */}

          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
          >

            <span className="navbar-toggler-icon"></span>

          </button>

          <div
            className="collapse navbar-collapse"
            id="navbar"
          >

            <ul className="navbar-nav ms-auto align-items-center">
                            {/* Home */}

              <li className="nav-item me-3">

                <Link
                  className="nav-link text-white"
                  to="/"
                >
                  <i className="bi bi-house-door-fill me-1"></i>

                  Home

                </Link>

              </li>

              {/* Menu */}

              <li className="nav-item me-3">

                <Link
                  className="nav-link text-white"
                  to="/menu"
                >
                  <i className="bi bi-grid-fill me-1"></i>

                  Menu

                </Link>

              </li>

              {/* Cart */}

              <li className="nav-item me-3">

                <button
                  className="btn btn-light position-relative"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#cartCanvas"
                >

                  <i className="bi bi-cart3 fs-5"></i>

                  {cart.length > 0 && (

                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >

                      {cart.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}

                    </span>

                  )}

                </button>

              </li>

              {user && (

                <li className="nav-item me-3">

                  <Link
                    className="nav-link text-white"
                    to="/orders"
                  >

                    <i className="bi bi-bag-check-fill me-1"></i>

                    My Orders

                  </Link>

                </li>

              )}

              {user ? (

                <>

                  <li className="nav-item me-3">

                    <span className="nav-link text-white fw-bold">

                      <i className="bi bi-person-circle me-2"></i>

                      {user.fullName}

                    </span>

                  </li>

                  <li className="nav-item">

                    <button
                      onClick={handleLogout}
                      className="btn btn-dark"
                      style={{
                        borderRadius: "25px",
                        padding: "8px 20px",
                      }}
                    >

                      <i className="bi bi-box-arrow-right me-1"></i>

                      Logout

                    </button>

                  </li>

                </>

              ) : (

                <>

                  <li className="nav-item me-2">

                    <Link
                      to="/login"
                      className="btn btn-light"
                      style={{
                        borderRadius: "25px",
                        padding: "8px 20px",
                      }}
                    >

                      <i className="bi bi-box-arrow-in-right me-1"></i>

                      Login

                    </Link>

                  </li>

                  <li className="nav-item">

                    <Link
                      to="/register"
                      className="btn btn-dark"
                      style={{
                        borderRadius: "25px",
                        padding: "8px 20px",
                      }}
                    >

                      <i className="bi bi-person-plus-fill me-1"></i>

                      Register

                    </Link>

                  </li>

                </>

              )}

            </ul>

          </div>

        </div>

      </nav>

      {/* ================= MINI CART ================= */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartCanvas"
      >

        <div className="offcanvas-header">

          <h5 className="fw-bold">
            🛒 Shopping Cart
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>

        </div>

        <div className="offcanvas-body">

          {cart.length === 0 ? (

            <p>Your cart is empty.</p>

          ) : (

            <>

{cart.map((item) => (

  <div
    key={item.id}
    className="border-bottom pb-3 mb-3"
  >

    <h6>{item.pizzaName}</h6>

    <small>{item.size}</small>

    <div className="d-flex align-items-center mt-2">

      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => decreaseQuantity(item.id)}
      >
        -
      </button>

      <span className="mx-3 fw-bold">
        {item.quantity}
      </span>

      <button
        className="btn btn-sm btn-outline-success"
        onClick={() => increaseQuantity(item.id)}
      >
        +
      </button>

    </div>

    <div className="mt-2">

      <strong>

        TZS {(item.price * item.quantity).toLocaleString()}

      </strong>

    </div>

    <button
      className="btn btn-danger btn-sm mt-2"
      onClick={() => removeItem(item.id)}
    >

      <i className="bi bi-trash"></i>

      Remove

    </button>

  </div>

))}
<div className="text-end mb-3">

  <button
    className="btn btn-outline-danger btn-sm"
    onClick={clearCart}
  >

    <i className="bi bi-trash"></i>

    Clear Cart

  </button>

</div>

              <hr />

              <h5>

                Total

                <span className="float-end">

                  TZS {total.toLocaleString()}

                </span>

              </h5>

              <Link
                to="/cart"
                className="btn btn-outline-dark w-100 mt-3"
                data-bs-dismiss="offcanvas"
              >

                View Cart

              </Link>
<button
  className="btn btn-outline-dark w-100 mt-3"
  onClick={() => {

    const closeBtn = document.querySelector(
      "#cartCanvas .btn-close"
    );

    closeBtn.click();

    setTimeout(() => {
      navigate("/checkout");
    }, 300);

  }}
>
  Checkout
</button>

            </>

          )}

        </div>

      </div>

    </>

  );

}

export default Navbar;
