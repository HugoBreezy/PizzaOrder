import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/api";
import logo from "../assets/images/logo.png";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (user.password !== confirmPassword) {

      toast.error("Passwords do not match");

      return;

    }

    try {

      setLoading(true);

      await registerUser(user);

      toast.success("Registration Successful!");

      setTimeout(() => {

        navigate("/login");

      }, 1200);

    } catch (error) {

      console.log(error);

      toast.error("Registration Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <section
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F4F0",
      }}
    >

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div
              className="card border-0 shadow-lg p-4 p-lg-5"
              style={{
                borderRadius: "20px",
              }}
            >

              <div className="text-center mb-4">

                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "90px",
                  }}
                />

                <h2
                  className="fw-bold mt-3"
                  style={{
                    color: "#8B0000",
                  }}
                >
                  Create Account
                </h2>

                <p className="text-muted">
                  Register to order your favourite pizza
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />

                  </div>

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Gender
                    </label>

                    <select
                      className="form-select"
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                    </select>

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Address
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    required
                  />

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm password"
                      required
                    />

                  </div>

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

                  {loading ? "Registering..." : "Register"}

                </button>

              </form>

              <div className="text-center mt-4">

                Already have an account?

                <Link
                  to="/login"
                  className="ms-2 fw-bold text-decoration-none"
                  style={{
                    color: "#8B0000",
                  }}
                >
                  Login
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

export default Register;