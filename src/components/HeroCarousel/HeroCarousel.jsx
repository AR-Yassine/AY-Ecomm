// src/components/HeroCarousel/HeroCarousel.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroCarousel.css";


function HeroCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const safeItems = Array.isArray(items) ? items : [];
  const length = safeItems.length || 1;

  // Auto-slide
  useEffect(() => {
    if (length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  const goTo = (i) => setIndex((i + length) % length);
  const current = safeItems[index] || safeItems[0];

  

  if (!current) return null;

  return (
    <section className="hero-carousel">
      <div className="hero-slide card-hover">
        <div className="hero-text">
          <p className="hero-kicker">Today’s Top Deal</p>
          <h1>{current.name}</h1>
          <p className="hero-desc">{current.shortDescription}</p>
          <p className="hero-price">${current.price.toFixed(2)}</p>

          <div className="hero-actions">
            <button
              className="hero-btn-primary"
              onClick={() => navigate(`/product/${current.id}`)}
            >
              View Details
            </button>
            <button
              className="hero-btn-secondary"
              onClick={() => navigate("/products")}
            >
              View All Deals
            </button>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img src={current.image} alt={current.name} />
        </div>

        {/* Arrows */}
        {length > 1 && (
          <>
            <button className="hero-arrow left" onClick={() => goTo(index - 1)}>
              ‹
            </button>
            <button className="hero-arrow right" onClick={() => goTo(index + 1)}>
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {length > 1 && (
        <div className="hero-dots">
          {safeItems.map((item, i) => (
            <button
              key={item.id}
              className={`hero-dot ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroCarousel;
