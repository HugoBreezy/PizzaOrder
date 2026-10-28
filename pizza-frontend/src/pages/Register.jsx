import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import { registerUser } from "../services/api";
import logo from "../assets/images/logo.png";
import pizzaImage from "../assets/images/hero-pizza.png";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "", email: "", phone: "", gender: "", address: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

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
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-page-register">
      <section className="auth-card auth-card-register">
        <aside className="auth-visual" style={{ backgroundImage: `linear-gradient(180deg, rgba(20, 15, 12, .08), rgba(20, 15, 12, .82)), url(${pizzaImage})` }}>
          <Link to="/" className="auth-brand"><img src={logo} alt="Pizza Ordering System" /><span>Pizza<span className="auth-brand-accent">House</span></span></Link>
          <div className="auth-visual-copy">
            <span className="auth-eyebrow"><i className="bi bi-heart-fill" /> GOOD TASTE STARTS HERE</span>
            <h1>Your next<br />favorite is waiting.</h1>
            <p>Join the family and get the good stuff: fresh pizza, easy ordering, and more reasons to gather.</p>
            <div className="auth-rating"><span className="auth-stars">★★★★★</span><span>One account. Endless pizza nights.</span></div>
          </div>
          <span className="auth-photo-credit">Good food. Good mood. 🍕</span>
        </aside>

        <div className="auth-form-side">
          <Link to="/" className="auth-mobile-brand"><img src={logo} alt="" /> Pizza<span>House</span></Link>
          <div className="auth-form-wrap">
            <div className="auth-heading">
              <span className="auth-kicker">LET'S MAKE IT OFFICIAL</span>
              <h2>Create your account</h2>
              <p>Just the basics, then the pizza is all yours.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form auth-register-form">
              <div className="auth-field">
                <label htmlFor="register-name">Full name</label>
                <div className="auth-input-wrap"><i className="bi bi-person" /><input id="register-name" type="text" name="fullName" value={user.fullName} onChange={handleChange} placeholder="Your name" autoComplete="name" required /></div>
              </div>
              <div className="auth-form-row">
                <div className="auth-field">
                  <label htmlFor="register-email">Email address</label>
                  <div className="auth-input-wrap"><i className="bi bi-envelope" /><input id="register-email" type="email" name="email" value={user.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required /></div>
                </div>
                <div className="auth-field">
                  <label htmlFor="register-phone">Phone number</label>
                  <div className="auth-input-wrap"><i className="bi bi-telephone" /><input id="register-phone" type="tel" name="phone" value={user.phone} onChange={handleChange} placeholder="Your phone number" autoComplete="tel" required /></div>
                </div>
              </div>
              <div className="auth-form-row">
                <div className="auth-field">
                  <label htmlFor="register-gender">Gender</label>
                  <div className="auth-input-wrap auth-select-wrap"><i className="bi bi-person-vcard" /><select id="register-gender" name="gender" value={user.gender} onChange={handleChange} required><option value="" disabled>Select gender</option><option value="Male">Male</option><option value="Female">Female</option></select></div>
                </div>
                <div className="auth-field">
                  <label htmlFor="register-address">Delivery address</label>
                  <div className="auth-input-wrap"><i className="bi bi-geo-alt" /><input id="register-address" type="text" name="address" value={user.address} onChange={handleChange} placeholder="Street, area, city" autoComplete="street-address" required /></div>
                </div>
              </div>
              <div className="auth-form-row">
                <div className="auth-field">
                  <label htmlFor="register-password">Password</label>
                  <div className="auth-input-wrap"><i className="bi bi-lock" /><input id="register-password" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Create a password" autoComplete="new-password" required /></div>
                </div>
                <div className="auth-field">
                  <label htmlFor="register-confirm">Confirm password</label>
                  <div className="auth-input-wrap"><i className="bi bi-shield-lock" /><input id="register-confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" autoComplete="new-password" required /></div>
                </div>
              </div>
              <button type="submit" className="auth-submit" disabled={loading}>{loading ? "Creating your account..." : <>Create account <i className="bi bi-arrow-right" /></>}</button>
            </form>

            <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
            <Link to="/" className="auth-back"><i className="bi bi-arrow-left" /> Back to home</Link>
          </div>
          <div className="auth-footer">© 2026 PizzaHouse <span>•</span> Made with <i className="bi bi-heart-fill" /> and mozzarella</div>
        </div>
      </section>
    </main>
  );
}

export default Register;
