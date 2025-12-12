// UPDATED ProductPage.jsx (NO REDIRECT, AUTH-SAFE, MODERN CONTEXT)

import "./ProductPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = products.find((p) => String(p.id) === id);

  /* ---------------------------
     REVIEWS STATE + LOCALSTORAGE
  --------------------------- */
  const storageKey = `reviews_${id}`;
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setReviews(JSON.parse(saved));
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reviews));
  }, [reviews, storageKey]);

  if (!product) {
    return (
      <div className="product-page">
        <p className="not-found">Product not found.</p>
        <button className="btn-back" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    );
  }

  /* ---------------------------
     ADD TO CART (NO REDIRECT)
  --------------------------- */
  const handleAddToCart = () => {
    if (!user) return;
    addToCart(product);
  };

  /* ---------------------------
     HANDLE ADD REVIEW
  --------------------------- */
  const submitReview = (e) => {
    e.preventDefault();

    if (!username || !comment || rating === 0) return;

    const newReview = {
      username,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]);
    setUsername("");
    setRating(0);
    setComment("");
  };

  return (
    <div className="product-page">

      {/* IMAGE HERO */}
      <div className="product-hero">
        <img src={product.image} alt={product.name} className="hero-image" />
        <div className="hero-glow"></div>
      </div>

      {/* INFO */}
      <div className="product-info-card glass">
        <p className="product-category">{product.category}</p>
        <h1 className="product-title">{product.name}</h1>

        <div className="product-meta">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating">
            ⭐ {product.rating} ({reviews.length + product.reviewsCount} reviews)
          </span>
        </div>

        <p className="product-short">{product.shortDescription}</p>

        <button
          className="btn-add"
          onClick={handleAddToCart}
          disabled={!user}
        >
          {user ? "Add to Cart" : "Login to Add"}
        </button>

        <button className="btn-back-light" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* DETAILS */}
      <div className="product-details-card glass">
        <h2>Product Details</h2>
        <p>{product.description}</p>

        <h3>Specifications</h3>
        <div className="specs-list">
          {product.specs.map((s, i) => (
            <div key={i} className="spec-item">
              <div className="spec-dot"></div>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="product-details-card glass">
        <h2>Customer Reviews</h2>

        <form className="review-form" onSubmit={submitReview}>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star active" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button type="submit" className="btn-add">
            Submit Review
          </button>
        </form>

        <div className="reviews-list">
          {reviews.length === 0 && (
            <p className="no-reviews">No reviews yet. Be the first!</p>
          )}

          {reviews.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-avatar">
                {r.username.charAt(0).toUpperCase()}
              </div>

              <div className="review-content">
                <p className="review-username">{r.username}</p>
                <p className="review-stars">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </p>
                <p className="review-text">{r.comment}</p>
                <p className="review-date">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductPage;
