// src/components/Navbar/Navbar.jsx
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";


function Navbar() {
  const [open, setOpen] = useState(false);
  const { getTotalQuantity } = useContext(CartContext);

  return (
    <nav className="navbar">

      {/* LEFT SIDE */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">AY E-Comm</Link>

        {/* DESKTOP LINKS */}
        <div className="nav-desktop">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/reviews" className="nav-link">Reviews</Link>
          <Link to="/products" className="nav-link">Products</Link>
        </div>
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div></div><div></div><div></div>
      </div>

      {/* RIGHT SIDE */}
      <div className={`nav-right ${open ? "open" : ""}`}>
        <div className="nav-auth">
          <Link to="/login" className="nav-link nav-link-outline">Login</Link>
          <Link to="/register" className="nav-link nav-link-secondary">Register</Link>
        </div>

        <div className="cart">
          🛒 <span className="cart-count">{getTotalQuantity()}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
