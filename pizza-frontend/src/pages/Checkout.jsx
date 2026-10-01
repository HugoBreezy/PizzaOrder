import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  createOrder,
  addOrderItem,
} from "../services/api";

function Checkout() {

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();


  // ==========================================
  // LOAD CART AND USER
  // ==========================================

  useEffect(() => {

    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    const loggedUser =
      JSON.parse(localStorage.getItem("user"));

    setCart(cartItems);

    setUser(loggedUser);

    const grandTotal = cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    setTotal(grandTotal);

  }, []);


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {

    if (!user) {

      toast.warning("Please login first.");

      navigate("/login");

      return;

    }


    if (cart.length === 0) {

      toast.warning("Your cart is empty.");

      return;

    }


    try {


      // ======================================
      // CREATE ORDER
      // ======================================

      const orderResponse =
        await createOrder({

          totalAmount: total,

          user: {
            id: user.id,
          },

        });


      const order = orderResponse.data;


      // ======================================
      // PAYMENT
      // ======================================
      //
      // Payment is now created automatically
      // inside OrderServiceImpl.createOrder()
      //
      // Status:
      // PENDING
      //
      // Method:
      // CASH_ON_DELIVERY
      //
      // Amount:
      // Order total
      //
      // ======================================


      // ======================================
      // SAVE ORDER ITEMS
      // ======================================

      for (const item of cart) {

        await addOrderItem({

          order: {
            id: order.id,
          },

          pizza: {
            id: item.id,
          },

          quantity: item.quantity,

          price: item.price,

          subtotal:
            item.price * item.quantity,

        });

      }


      // ======================================
      // CLEAR CART
      // ======================================

      localStorage.removeItem("cart");

      setCart([]);


      // ======================================
      // SUCCESS
      // ======================================

      toast.success(
        "Order placed successfully!"
      );


      setTimeout(() => {

        navigate("/orders");

      }, 1200);


    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data ||
        "Failed to place order."
      );

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


          {/* =====================================
              PAGE TITLE
          ===================================== */}

          <h2
            className="fw-bold mb-4"
            style={{
              color: "#8B0000",
            }}
          >
            Checkout
          </h2>


          <div className="row">


            {/* =====================================
                CUSTOMER INFORMATION
            ===================================== */}

            <div className="col-lg-8">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    Customer Information
                  </h4>

                  <hr />


                  <p>
                    <strong>Name:</strong>{" "}
                    {user?.fullName}
                  </p>


                  <p>
                    <strong>Email:</strong>{" "}
                    {user?.email}
                  </p>


                  <p>
                    <strong>Phone:</strong>{" "}
                    {user?.phone}
                  </p>


                  <p>
                    <strong>Address:</strong>{" "}
                    {user?.address}
                  </p>


                  <hr />


                  {/* =====================================
                      ORDER SUMMARY
                  ===================================== */}

                  <h4>
                    Order Summary
                  </h4>

                  <hr />


                  {cart.length === 0 ? (

                    <p>
                      Your cart is empty.
                    </p>

                  ) : (

                    cart.map((item) => (

                      <div
                        key={item.id}
                        className="d-flex justify-content-between border-bottom py-2"
                      >

                        <div>

                          <strong>
                            {item.pizzaName}
                          </strong>

                          <br />

                          <small>
                            {item.size} ×{" "}
                            {item.quantity}
                          </small>

                        </div>


                        <strong>

                          TZS{" "}

                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString()}

                        </strong>

                      </div>

                    ))

                  )}

                </div>

              </div>

            </div>


            {/* =====================================
                PAYMENT
            ===================================== */}

            <div className="col-lg-4">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    Payment
                  </h4>

                  <hr />


                  <p>

                    <strong>
                      Method:
                    </strong>{" "}

                    Cash On Delivery

                  </p>


                  <hr />


                  <div
                    className="d-flex justify-content-between"
                  >

                    <strong>
                      Total
                    </strong>

                    <strong>

                      TZS{" "}
                      {total.toLocaleString()}

                    </strong>

                  </div>


                  <button
                    onClick={handlePlaceOrder}
                    className="btn w-100 mt-4"
                    style={{
                      backgroundColor: "#8B0000",
                      color: "white",
                    }}
                  >

                    Place Order

                  </button>

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

export default Checkout;