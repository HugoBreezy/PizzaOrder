import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/api";
import logo from "../assets/images/logo.png";

function Login() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    const response = await loginUser(
      login.email,
      login.password
    );

    const user = response.data;

    if (!user) {

      toast.error("Invalid Email or Password");

      return;

    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    toast.success("Login Successful!");

    setTimeout(() => {

      if (user.role === "ADMIN") {

        navigate("/admin");

      } else {

        navigate("/");

      }

    }, 1200);

  } catch (error) {

    console.log(error);

    if (
      error.response &&
      error.response.data ===
      "Your account has been deactivated. Please contact the administrator."
    ) {

      toast.error(
        "Your account has been deactivated. Please contact the administrator."
      );

    } else {

      toast.error("Invalid Email or Password");

    }

  } finally {

    setLoading(false);

  }

};

  return (

    <section
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F4F0",
      }}
    >

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-5 col-md-7">

            <div
              className="card border-0 shadow-lg p-4"
              style={{
                borderRadius: "20px",
              }}
            >

              <div className="text-center">

                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "90px",
                    marginBottom: "15px",
                  }}
                />

                <h2
                  className="fw-bold"
                  style={{
                    color: "#8B0000",
                  }}
                >
                  Welcome Back
                </h2>

                <p className="text-muted">
                  Login to your account
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={login.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn w-100 py-2"
                  disabled={loading}
                  style={{
                    backgroundColor: "#8B0000",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "18px",
                  }}
                >

                  {loading ? "Logging in..." : "Login"}

                </button>

              </form>

              <div className="text-center mt-4">

                <span>
                  Don't have an account?
                </span>

                <Link
                  to="/register"
                  className="ms-2 text-decoration-none fw-bold"
                  style={{
                    color: "#8B0000",
                  }}
                >
                  Register
                </Link>

              </div>

              <div className="text-center mt-3">

                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{
                    color: "#8B0000",
                  }}
                >
                  ← Back to Home
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Login;