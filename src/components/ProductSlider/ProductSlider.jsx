import "./ProductSlider.css";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

function ProductSlider({ widget }) {
  const products = Array.isArray(widget?.products) ? widget.products : [];
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  // Check if buttons are needed
  const checkButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowButtons(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    checkButtons();

    // Recheck on window resize
    window.addEventListener("resize", checkButtons);
    return () => window.removeEventListener("resize", checkButtons);
  }, [products]);

  // Recalculate after images load
  useEffect(() => {
    const images = scrollRef.current?.querySelectorAll("img") || [];
    let loaded = 0;

    images.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === images.length) checkButtons();
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === images.length) checkButtons();
        };
      }
    });
  }, [products]);

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  if (!products.length) return null;

  return (
    <section className="product-slider-section">
      <h3>{widget.title}</h3>

      <div className="slider-wrapper">

        {/* LEFT BUTTON */}
        {showButtons && (
          <button className="slider-btn left" onClick={scrollLeft}>‹</button>
        )}

        {/* PRODUCTS */}
        <div className="h-scroll" ref={scrollRef}>
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="h-card"
            >
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

        {/* RIGHT BUTTON */}
        {showButtons && (
          <button className="slider-btn right" onClick={scrollRight}>›</button>
        )}

      </div>
    </section>
  );
}

export default ProductSlider;
