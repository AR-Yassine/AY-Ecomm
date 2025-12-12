import "./CartPage.css";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const {
    cart = [], // ✅ safety fallback
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/products" className="back-to-shop">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-layout">
        {/* LEFT: ITEMS */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
                <span>Qty: {item.quantity}</span>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Total</span>
            <strong>${getTotalPrice().toFixed(2)}</strong>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>

          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
