// FIXED PaymentPage.jsx
// SUCCESS MESSAGE NOW SHOWS (REDIRECT VIA useEffect)

import "./PaymentPage.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";

function PaymentPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handlePay = () => {
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="checkout-success">
        <h2>✅ Payment Successful</h2>
        <p>You will be redirected to Home shortly…</p>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h1>Online Payment</h1>

      <div className="payment-card">
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="Card Holder Name" />

        <div className="payment-row">
          <input type="text" placeholder="MM/YY" />
          <input type="text" placeholder="CVV" />
        </div>

        <button onClick={handlePay}>Pay Now</button>
      </div>
    </div>
  );
}

export default PaymentPage;
