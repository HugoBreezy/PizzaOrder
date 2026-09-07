import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PizzaCard from "../components/PizzaCard";
import Footer from "../components/Footer";
import heroPizza from "../assets/images/hero-pizza.png";
import { getAllPizzas } from "../services/api";

function Home() {

  const [featuredPizzas, setFeaturedPizzas] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    loadFeaturedPizzas();

  }, []);

  const loadFeaturedPizzas = async () => {

    try {

      const response = await getAllPizzas();

      setFeaturedPizzas(response.data.slice(0, 4));

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section
        style={{
          backgroundColor: "#F8F4F0",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >

        <div className="container">

          <div className="row align-items-center">

            {/* Left */}

            <div className="col-lg-6">

              <h5
                className="fw-bold"
                style={{ color: "#8B0000" }}
              >
                BEST PIZZA IN TOWN
              </h5>

              <h1
                className="display-2 fw-bold"
                style={{ color: "#8B0000" }}
              >
                Hot & Delicious Pizza
              </h1>

              <p className="lead mt-4">
                Fresh ingredients, premium cheese and fast delivery.
                Enjoy your favourite pizza with just a few clicks.
              </p>

              <div className="mb-4">

                <span className="text-warning fs-4">
                  ★★★★★
                </span>

                <span className="fw-bold ms-2">
                  4.9 Rating
                </span>

              </div>

              <Link
                to="/menu"
                className="btn btn-lg me-3"
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                  borderRadius: "30px",
                }}
              >
                Explore Menu
              </Link>

              {user ? (

                <Link
                  to="/menu"
                  className="btn btn-outline-dark btn-lg"
                  style={{
                    borderRadius: "30px",
                  }}
                >
                  Order Now
                </Link>

              ) : (

                <Link
                  to="/login"
                  className="btn btn-outline-dark btn-lg"
                  style={{
                    borderRadius: "30px",
                  }}
                >
                  Login
                </Link>

              )}

            </div>

            {/* Right */}

            <div className="col-lg-6 text-center">

              <img
                src={heroPizza}
                alt="Pizza"
                className="img-fluid"
                style={{
                  maxWidth: "650px",
                  borderRadius: "30px",
                }}
              />

            </div>

          </div>

        </div>

      </section>

      {/* Featured Pizzas */}

      <section className="py-5 bg-white">

        <div className="container">

          <h2
            className="text-center fw-bold mb-5"
            style={{ color: "#8B0000" }}
          >
            Featured Pizzas
          </h2>

          <div className="row">

            {featuredPizzas.map((pizza) => (

              <PizzaCard
                key={pizza.id}
                pizza={pizza}
              />

            ))}

          </div>

          <div className="text-center mt-4">

            <Link
              to="/menu"
              className="btn btn-lg"
              style={{
                backgroundColor: "#8B0000",
                color: "white",
                borderRadius: "30px",
              }}
            >
              View Full Menu
            </Link>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section
        className="py-5"
        style={{ backgroundColor: "#F8F4F0" }}
      >

        <div className="container">

          <h2
            className="text-center fw-bold mb-5"
            style={{ color: "#8B0000" }}
          >
            Why Choose Us
          </h2>

          <div className="row text-center">

            <div className="col-lg-3 col-md-6 mb-4">

              <div className="shadow p-4 rounded bg-white h-100">

                <h1>🚚</h1>

                <h5 className="fw-bold">
                  Fast Delivery
                </h5>

                <p>
                  We deliver your pizza quickly while it's still hot.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6 mb-4">

              <div className="shadow p-4 rounded bg-white h-100">

                <h1>🥩</h1>

                <h5 className="fw-bold">
                  Fresh Ingredients
                </h5>

                <p>
                  Every pizza is made using fresh ingredients.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6 mb-4">

              <div className="shadow p-4 rounded bg-white h-100">

                <h1>👨‍🍳</h1>

                <h5 className="fw-bold">
                  Professional Chefs
                </h5>

                <p>
                  Prepared by experienced pizza chefs.
                </p>

              </div>

            </div>

            <div className="col-lg-3 col-md-6 mb-4">

              <div className="shadow p-4 rounded bg-white h-100">

                <h1>💰</h1>

                <h5 className="fw-bold">
                  Affordable Price
                </h5>

                <p>
                  Best quality pizzas at affordable prices.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;