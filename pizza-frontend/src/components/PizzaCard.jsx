import { useNavigate } from "react-router-dom";

function PizzaCard({ pizza }) {

  const navigate = useNavigate();

  const defaultImage =
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600";

  const handleAddToCart = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      alert("Please login first to place your order.");

      navigate("/login");

      return;

    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingPizza = cart.find(
      (item) => item.id === pizza.id
    );

    if (existingPizza) {

      existingPizza.quantity += 1;

    } else {

      cart.push({
        id: pizza.id,
        pizzaName: pizza.pizzaName,
        size: pizza.size,
        price: pizza.price,
        description: pizza.description,
        image: pizza.image,
        quantity: 1,
      });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${pizza.pizzaName} added to cart.`);

  };

  return (

    <div className="col-lg-3 col-md-6 mb-4">

      <div
        className="card border-0 shadow-lg h-100"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          transition: "0.3s",
        }}
      >

        <img
          src={
            pizza.image
              ? `http://localhost:8080${pizza.image}`
              : defaultImage
          }
          className="card-img-top"
          alt={pizza.pizzaName}
          style={{
            height: "220px",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />

        <div className="card-body text-center">

          <h4 className="fw-bold">
            {pizza.pizzaName}
          </h4>

          <p className="text-muted">
            {pizza.size}
          </p>

          <h5
            className="fw-bold"
            style={{
              color: "#8B0000",
            }}
          >
            TZS {Number(pizza.price).toLocaleString()}
          </h5>

          <p
            className="text-muted"
            style={{
              fontSize: "14px",
              minHeight: "45px",
            }}
          >
            {pizza.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="btn w-100"
            style={{
              backgroundColor: "#8B0000",
              color: "white",
              borderRadius: "25px",
            }}
          >
            <i className="bi bi-cart-plus me-2"></i>

            Add to Cart

          </button>

        </div>

      </div>

    </div>

  );
}

export default PizzaCard;