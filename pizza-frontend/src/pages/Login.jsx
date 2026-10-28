import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { loginUser } from "../services/api";
import logo from "../assets/images/logo.png";
import pizzaImage from "../assets/images/hero-pizza.png";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(login.email, login.password);
      const user = response.data;
      if (!user) {
        toast.error("Invalid Email or Password");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login Successful!");
      setTimeout(() => {
        if (user.role === "ADMIN") navigate("/admin");
        else if (user.role === "DELIVERY") navigate("/delivery");
        else navigate("/");
      }, 1200);
    } catch (error) {
      console.log(error);
      if (error.response?.data === "Your account has been deactivated. Please contact the administrator.") {
        toast.error("Your account has been deactivated. Please contact the administrator.");
      } else toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-login">
        <aside className="auth-visual" style={{ backgroundImage: `linear-gradient(180deg, rgba(20, 15, 12, .08), rgba(20, 15, 12, .82)), url(${pizzaImage})` }}>
          <Link to="/" className="auth-brand"><img src={logo} alt="Pizza Ordering System" /><span>Pizza<span className="auth-brand-accent">House</span></span></Link>
          <div className="auth-visual-copy">
            <span className="auth-eyebrow"><i className="bi bi-stars" /> FRESH FROM OUR OVEN</span>
            <h1>A little slice<br />of happiness.</h1>
            <p>Handcrafted with love, baked to perfection, and delivered straight to your door.</p>
            <div className="auth-rating"><span className="auth-stars">★★★★★</span><span>Made fresh, every single time</span></div>
          </div>
          <span className="auth-photo-credit">Good food. Good mood. 🍕</span>
        </aside>

        <div className="auth-form-side">
          <Link to="/" className="auth-mobile-brand"><img src={logo} alt="" /> Pizza<span>House</span></Link>
          <div className="auth-form-wrap">
            <div className="auth-heading">
              <span className="auth-kicker">YOUR TABLE IS READY</span>
              <h2>Welcome back</h2>
              <p>Sign in to pick up where the deliciousness left off.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label htmlFor="login-email">Email address</label>
                <div className="auth-input-wrap"><i className="bi bi-envelope" /><input id="login-email" type="email" name="email" value={login.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required /></div>
              </div>
              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <div className="auth-input-wrap"><i className="bi bi-lock" /><input id="login-password" type="password" name="password" value={login.password} onChange={handleChange} placeholder="Enter your password" autoComplete="current-password" required /></div>
              </div>
              <button type="submit" className="auth-submit" disabled={loading}>{loading ? "Signing you in..." : <>Sign in <i className="bi bi-arrow-right" /></>}</button>
            </form>

            <p className="auth-switch">New to PizzaHouse? <Link to="/register">Create an account</Link></p>
            <Link to="/" className="auth-back"><i className="bi bi-arrow-left" /> Back to home</Link>
          </div>
          <div className="auth-footer">© 2026 PizzaHouse <span>•</span> Made with <i className="bi bi-heart-fill" /> and mozzarella</div>
        </div>
      </section>
    </main>
  );
}

export default Login;
