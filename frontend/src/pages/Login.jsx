import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../assets/Logo.svg";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Dummy login logic
    if (!form.username || !form.password) {
      setMessage("Please fill in all fields.");
      return;
    }
    setMessage("Login successful!");
    setForm({ username: "", password: "" });
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