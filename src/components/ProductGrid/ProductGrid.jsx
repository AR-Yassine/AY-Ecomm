import "./ProductGrid.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function ProductGrid({ widget }) {
  const products = widget?.products || [];
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <section className="product-grid-section">
      {widget.title && <h3>{widget.title}</h3>}

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="grid-card">
            <Link to={`/product/${product.id}`}>
              <div className="grid-image">
                <img src={product.image} alt={product.name} />
              </div>

              <h4 className="grid-title">{product.name}</h4>
              <p className="grid-price">${product.price}</p>
            </Link>

            <button
              className="grid-add-btn"
              onClick={() => {
                if (!user) return navigate("/login");
                addToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
