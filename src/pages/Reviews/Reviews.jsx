import { useState } from "react";
import "./Reviews.css";
import { FaStar } from "react-icons/fa";

const presetReviews = [
  {
    name: "Emily Roberts",
    image: "/images/avatars/a1.png",
    productImage: "/images/fashion/classic-white.png",
    stars: 5,
    message:
      "Absolutely loved the quality! The fabric is soft and comfortable, and shipping was super fast. Highly recommend!",
  },

  {
    name: "Daniel Carter",
    image: "/images/avatars/a2.png",
    productImage: "/images/tech/rgb-keyboard.png",
    stars: 4,
    message:
      "Great value for money. The RGB keyboard looks amazing on my desk. Keys feel nice and clicky. Would buy again!",
  },

  {
    name: "ريم خالد",
    image: "/images/avatars/a3.png",
    productImage: "/images/accessories/gold-braclet.png",
    stars: 5,
    message:
      "الخدمة رائعة جداً! الأسورة أجمل بكثير من الصورة وجودتها ممتازة. التغليف كان مرتب والتوصيل سريع جداً.",
  },

    {
    name: "محمد الأسعد",
    image: "/images/avatars/a4.png",
    productImage: "/images/accessories/classywatch.png",
    stars: 4,
    message: "الجودة عالية والسعر مناسب جداً. ولكن تمنيت يكون في ألوان أكثر.",
  },

];


function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const submitReview = () => {
    if (!text.trim() || rating === 0) return;

    setReviews([
      { message: text, stars: rating, date: new Date() },
      ...reviews,
    ]);

    setText("");
    setRating(0);
  };

  return (
    <div className="reviews-page">

      <h1>Customer Reviews</h1>
      <p className="subtitle">Real feedback from our amazing customers</p>

      {/* ⭐ PRESET REVIEWS (Top Section) */}
      <div className="preset-reviews">
        {presetReviews.map((r, i) => (
          <div className="preset-card" key={i}>
            <div className="preset-header">
              <img src={r.image} alt="avatar" className="avatar" />
              <div>
                <h3 className="preset-name">{r.name}</h3>
                <div className="preset-stars">
                  {[1,2,3,4,5].map((num) => (
                    <FaStar
                      key={num}
                      className={num <= r.stars ? "star active" : "star"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <img src={r.productImage} className="preset-product" alt="product" />

            <p className="preset-message">{r.message}</p>
          </div>
        ))}
      </div>

      {/* ⭐ USER INPUT REVIEW BOX */}
      <div className="review-box">

        <div className="stars">
          {[1,2,3,4,5].map((num) => (
            <FaStar
              key={num}
              className={num <= rating ? "star active" : "star"}
              onClick={() => setRating(num)}
            />
          ))}
        </div>

        <textarea
          placeholder="Write your honest review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={submitReview}>Submit Review</button>
      </div>

      {/* ⭐ USER REVIEWS */}
      <div className="reviews-list">

        {reviews.length === 0 && (
          <p className="empty">No reviews yet — be the first to share your experience! ❤️</p>
        )}

        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="card-stars">
              {[1,2,3,4,5].map((num) => (
                <FaStar
                  key={num}
                  className={num <= r.stars ? "star active" : "star"}
                />
              ))}
            </div>

            <p className="message">{r.message}</p>
            <span className="date">{r.date.toLocaleString()}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ReviewsPage;
