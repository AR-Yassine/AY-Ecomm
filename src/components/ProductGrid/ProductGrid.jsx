import "./ProductGrid.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

function ProductGrid({ widget }) {
  const products = Array.isArray(widget?.products) ? widget.products : [];
  const scrollRef = useRef(null);

  if (!products.length) return null;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="product-grid-section">
      <h3>{widget.title}</h3>

      <div className="slider-wrapper">
        <button className="slider-btn left" onClick={scrollLeft}>‹</button>

        <div className="h-scroll" ref={scrollRef}>
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="h-card">
              <div className="h-image-wrapper">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="h-title">{product.name}</div>

              <div className="h-rating">
                ⭐ {product.rating} ({product.reviewsCount})
              </div>

              <div className="h-desc">{product.shortDescription}</div>

              <div className="h-price">${product.price.toFixed(2)}</div>
            </Link>
          ))}
        </div>

        <button className="slider-btn right" onClick={scrollRight}>›</button>
      </div>
    </section>
  );
}

export default ProductGrid;
