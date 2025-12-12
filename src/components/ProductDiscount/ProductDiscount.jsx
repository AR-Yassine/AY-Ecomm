import "./ProductDiscount.css";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

function ProductDiscount({ widget }) {
  const products = Array.isArray(widget?.products) ? widget.products : [];
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowButtons(el.scrollWidth > el.clientWidth);
  }, [products]);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  if (!products.length) return null;

  return (
    <section className="discount-section">
      <h3>{widget.title}</h3>

      <div className="slider-wrapper">

        {showButtons && (
          <button className="slider-btn left" onClick={scrollLeft}>‹</button>
        )}

        <div className="h-scroll" ref={scrollRef}>
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="d-card">

              <div className="discount-badge">-{product.discount}%</div>

              <div className="h-image-wrapper">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="h-title">{product.name}</div>

              <div className="h-rating">
                ⭐ {product.rating} ({product.reviewsCount})
              </div>

              <div className="h-desc">{product.shortDescription}</div>

              <div className="price-row">
                <span className="old-price">${product.oldPrice}</span>
                <span className="new-price">${product.price}</span>
              </div>
            </Link>
          ))}
        </div>

        {showButtons && (
          <button className="slider-btn right" onClick={scrollRight}>›</button>
        )}
      </div>
    </section>
  );
}

export default ProductDiscount;
