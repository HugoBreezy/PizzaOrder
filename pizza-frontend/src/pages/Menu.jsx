import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PizzaCard from "../components/PizzaCard";
import { getAllPizzas } from "../services/api";

function Menu() {

  const [pizzas, setPizzas] = useState([]);
  const [filteredPizzas, setFilteredPizzas] = useState([]);
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("All Sizes");

  useEffect(() => {

    loadPizzas();

  }, []);

  const loadPizzas = async () => {

    try {

      const response = await getAllPizzas();

      setPizzas(response.data);

      setFilteredPizzas(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load pizzas");

    }

  };

  useEffect(() => {

    let result = pizzas;

    if (search !== "") {

      result = result.filter((pizza) =>
        pizza.pizzaName
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    if (size !== "All Sizes") {

      result = result.filter(
        (pizza) => pizza.size === size
      );

    }

    setFilteredPizzas(result);

  }, [search, size, pizzas]);

  return (
    <>
      <Navbar />

      {/* Header */}

      <section
        className="py-5"
        style={{
          backgroundColor: "#F8F4F0",
        }}
      >

        <div className="container text-center">

          <h1
            className="fw-bold"
            style={{
              color: "#8B0000",
            }}
          >
            Our Pizza Menu
          </h1>

          <p className="text-muted">
            Choose your favourite pizza and place your order.
          </p>

        </div>

      </section>

      {/* Search */}

      <section className="py-4 bg-white">

        <div className="container">

          <div className="row g-3">

            <div className="col-lg-8">

              <input
                type="text"
                className="form-control"
                placeholder="Search pizza..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="col-lg-4">

              <select
                className="form-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >

                <option>All Sizes</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>

              </select>

            </div>

          </div>

        </div>

      </section>
            {/* Pizza Cards */}

      <section
        className="py-5"
        style={{
          backgroundColor: "#F8F4F0",
        }}
      >

        <div className="container">

          <div className="row">

            {filteredPizzas.length > 0 ? (

              filteredPizzas.map((pizza) => (

                <PizzaCard
                  key={pizza.id}
                  pizza={pizza}
                />

              ))

            ) : (

              <div className="col-12 text-center">

                <h4 className="text-muted">

                  No Pizza Found

                </h4>

              </div>

            )}

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Menu;