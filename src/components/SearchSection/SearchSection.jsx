import "./SearchSection.css";
import { useState } from "react";
import { products } from "../../data/products";
import { useNavigate } from "react-router-dom";

function SearchSection() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );

    setFiltered(results.slice(0, 6)); // max 6 suggestions
  };

  const handleSelect = (id) => {
    setQuery("");
    setFiltered([]);
    navigate(`/product/${id}`);
  };

  return (
    <div className="search-section">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleChange}
        />
        <button className="search-btn">
          🔍
        </button>
      </div>

      {filtered.length > 0 && (
        <div className="search-results">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="search-item"
              onClick={() => handleSelect(p.id)}
            >
              <span className="s-name">{p.name}</span>
              <span className="s-price">${p.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchSection;
