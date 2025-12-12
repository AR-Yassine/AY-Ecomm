import "./Filters.css";
import { useState } from "react";

function Filters({ setFilters }) {
  const [localFilters, setLocalFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const apply = () => {
    setFilters(localFilters);
  };

  return (
    <div className="filters-box">
      <h3>Filters</h3>

      <label className="filter-label">Category</label>
      <select
        name="category"
        className="filter-select"
        onChange={handleChange}
      >
        <option value="">All</option>
        <option value="Tech">Tech</option>
        <option value="Clothing">Clothing</option>
        <option value="Accessories">Accessories</option>
        <option value="Home">Home</option>
        <option value="Beauty">Beauty</option>
        <option value="Footwear">Footwear</option>
        <option value="Cameras">Cameras</option>
        <option value="Wearables">Wearables</option>
      </select>

      <label className="filter-label">Min Price</label>
      <input
        type="number"
        className="filter-input"
        name="minPrice"
        onChange={handleChange}
      />

      <label className="filter-label">Max Price</label>
      <input
        type="number"
        className="filter-input"
        name="maxPrice"
        onChange={handleChange}
      />

      <label className="filter-label">Minimum Rating</label>
      <select
        name="rating"
        className="filter-select"
        onChange={handleChange}
      >
        <option value="">All</option>
        <option value="4">4★ & up</option>
        <option value="4.5">4.5★ & up</option>
      </select>

      <button className="apply-btn" onClick={apply}>Apply Filters</button>
    </div>
  );
}

export default Filters;
