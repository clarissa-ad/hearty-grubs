import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../assets/Logo.svg";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.username || !form.password) {
      setMessage("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setForm({ username: "", password: "" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error logging in. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="login-root">
      <div className="login-left">
        <Link to="/" onClick={() => setView("")}><img src={Logo} alt="Logo" className="login-logo" /></Link>
        <br />
        <h2 className="login-title">Login</h2>
        <br />
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <p className="register-link">
          Don&apos;t have an account yet?{" "}
          <Link to="/register" className="register-link-text">
            Register
          </Link>
        </p>
      </div>
      <div className="login-right">
        <h1 textAlign="left">
          Welcome Back<br />
          To Hearty Grub’s!
        </h1>
        <p textAlign="left">
          Log in to explore your saved recipes, recent activity, and personalized recommendations.
        </p>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
          alt="Food"
          className="login-food-img"
        />
      </div>
    </div>
  );
}