import "./CheckoutPage.css";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    payment: "cod",
  });

  const [success, setSuccess] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  // 🔁 Redirect AFTER success message
  useEffect(() => {
    if (success && redirectTo) {
      const timer = setTimeout(() => {
        navigate(redirectTo);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, redirectTo, navigate]);

  // ❌ DO NOT REDIRECT IF SUCCESS IS TRUE
  if (!success && (!cart || cart.length === 0)) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email) return;

    // ✅ SHOW SUCCESS FIRST
    setSuccess(true);

    if (form.payment === "online") {
      setRedirectTo("/payment");
    } else {
      setRedirectTo("/");
    }

    clearCart(); // ✅ SAFE NOW
  };

  // ✅ SUCCESS UI
  if (success) {
    return (
      <div className="checkout-success">
        <h2>✅ Order Placed Successfully</h2>
        <p>You will be redirected shortly…</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-summary">
          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>
            <strong>${getTotalPrice().toFixed(2)}</strong>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Customer Information</h3>

          <input name="fullName" placeholder="Full Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="email" placeholder="Email Address" onChange={handleChange} />

          <select name="payment" onChange={handleChange}>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>

          <button type="submit">
            {form.payment === "online"
              ? "Proceed to Payment"
              : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
