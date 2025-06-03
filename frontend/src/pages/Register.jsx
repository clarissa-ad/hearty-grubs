import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../assets/Logo.svg";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    setMessage(`Registration successful! Welcome, ${form.username}!`);
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="register-root">
      <div className="register-left">
        <h1 textAlign="left">
          Join Hearty Grub’s –<br />
          Your Kitchen Companion<br />Starts Here!
        </h1>
        <p textAlign="left">
          Create an account to save your favorite recipes, leave reviews, and
          discover delicious dishes made just for you.
        </p>
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
          alt="Food"
          className="register-food-img"
        />
        <div className="flower-decor flower1">✿</div>
        {/* <div className="flower-decor flower2">✿</div> */}
      </div>
      <div className="register-right">
        <Link to="/" onClick={() => setView("")}><img src={Logo} alt="Logo" className="register-logo" /></Link>
        <br />
        <h2 className="register-title">Register</h2>
        <form id="registerForm" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-btn">
            Sign In
          </button>
        </form>
        {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login" className="login-link-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}