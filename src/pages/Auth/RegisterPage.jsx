// src/pages/Auth/RegisterPage.jsx
import { useState } from "react";
import "./Auth.css";   // ⬅️ same CSS

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handle submit...
          }}
        >
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </label>

          <label>
            Telephone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+961..."
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
