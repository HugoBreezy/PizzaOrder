import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(cartItems);

  }, []);

  const saveCart = (items) => {

    setCart(items);

    localStorage.setItem("cart", JSON.stringify(items));

  };

  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) =>

      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item

    );

    saveCart(updatedCart);

  };

  const decreaseQuantity = (id) => {

    const updatedCart = cart
      .map((item) =>

        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item

      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);

  };

  const removeItem = (id) => {

    const updatedCart = cart.filter((item) => item.id !== id);

    saveCart(updatedCart);

  };

  const total = cart.reduce(

    (sum, item) => sum + item.price * item.quantity,

    0

  );

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
            style={{ color: "#8B0000" }}
          >
            Shopping Cart
          </h2>

          <div className="table-responsive">

            <table className="table table-bordered align-middle bg-white shadow">

              <thead
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                }}
              >

                <tr>

                  <th>Pizza</th>

                  <th>Size</th>

                  <th>Price</th>

                  <th>Quantity</th>

                  <th>Subtotal</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>
                            {cart.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-4"
                  >
                    Your cart is empty.
                  </td>

                </tr>

              ) : (

                cart.map((item) => (

                  <tr key={item.id}>

                    <td>{item.pizzaName}</td>

                    <td>{item.size}</td>

                    <td>
                      TZS {Number(item.price).toLocaleString()}
                    </td>

                    <td>

                      <button
                        className="btn btn-sm btn-outline-danger me-2"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>

                      {item.quantity}

                      <button
                        className="btn btn-sm btn-outline-success ms-2"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>

                    </td>

                    <td>

                      TZS {Number(item.price * item.quantity).toLocaleString()}

                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>

                    </td>

                  </tr>

                ))

              )}

              </tbody>

            </table>

          </div>

          <div className="row justify-content-end mt-4">

            <div className="col-lg-4">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4
                    className="fw-bold"
                    style={{ color: "#8B0000" }}
                  >
                    Cart Summary
                  </h4>

                  <hr />

                  <div className="d-flex justify-content-between mb-3">

                    <strong>Total</strong>

                    <strong>

                      TZS {Number(total).toLocaleString()}

                    </strong>

                  </div>

                  <Link
                    to="/checkout"
                    className={`btn w-100 ${cart.length === 0 ? "disabled" : ""}`}
                    style={{
                      backgroundColor: "#8B0000",
                      color: "white",
                    }}
                  >
                    Proceed to Checkout
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Cart;