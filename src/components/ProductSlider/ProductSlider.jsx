import "./ProductSlider.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function ProductSlider({ widget }) {
  const products = Array.isArray(widget?.products) ? widget.products : [];
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const checkButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowButtons(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    checkButtons();
    window.addEventListener("resize", checkButtons);
    return () => window.removeEventListener("resize", checkButtons);
  }, [products]);

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  if (!products.length) return null;

  return (
    <section className="product-slider-section">
      {widget.title && <h3>{widget.title}</h3>}

      <div className="slider-wrapper">
        {showButtons && (
          <button className="slider-btn left" onClick={scrollLeft}>‹</button>
        )}

        <div className="h-scroll" ref={scrollRef}>
          {products.map((product) => (
            <div key={product.id} className="h-card">
              <Link to={`/product/${product.id}`}>
                <div className="h-image-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="h-title">{product.name}</div>
                <div className="h-rating">⭐ {product.rating} ({product.reviewsCount})</div>
                <div className="h-desc">{product.shortDescription}</div>
                <div className="h-price">${product.price.toFixed(2)}</div>
              </Link>

              <button
                className="add-cart-btn"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {showButtons && (
          <button className="slider-btn right" onClick={scrollRight}>›</button>
        )}
      </div>
    </section>
  );
}

export default ProductSlider;
