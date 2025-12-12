import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { getTotalQuantity } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalQty = getTotalQuantity();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const handleCartClick = () => {
    setOpen(false);
    if (!user) navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
        AY E-Comm
      </Link>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>

      <div className={`nav-right ${open ? "open" : ""}`}>
        <NavLink to="/about" className="nav-link" onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="/contact" className="nav-link" onClick={() => setOpen(false)}>Contact</NavLink>
        <NavLink to="/reviews" className="nav-link" onClick={() => setOpen(false)}>Reviews</NavLink>
        <NavLink to="/products" className="nav-link" onClick={() => setOpen(false)}>Products</NavLink>

        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" className="nav-link nav-link-secondary" onClick={() => setOpen(false)}>
              Register
            </Link>
          </>
        )}

        <Link to={user ? "/cart" : "/login"} className="cart" onClick={handleCartClick}>
          🛒
          {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
