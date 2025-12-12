// src/pages/Auth/LoginPage.jsx
import { useState } from "react";
import "./Auth.css";   // ⬅️ use shared CSS

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handle submit...
          }}
        >
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
