import "./HomePage.css";

import HeroCarousel from "../../components/HeroCarousel/HeroCarousel.jsx";
import ProductSlider from "../../components/ProductSlider/ProductSlider.jsx";
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx";
import SearchSection from "../../components/SearchSection/SearchSection";
import ProductDiscount from "../../components/ProductDiscount/ProductDiscount";
import Filters from "../../components/Filters/Filters";

import { products } from "../../data/products";
import { useState } from "react";

// Utility: pick random elements
function getRandomItems(list, count) {
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function HomePage() {
  const [filters, setFilters] = useState({});

  // Apply filtering to any product list
  const applyFilters = (list) =>
    list.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.rating && p.rating < Number(filters.rating)) return false;
      return true;
    });

  // Check if filtering is active
  const filtersActive =
    filters.category || filters.minPrice || filters.maxPrice || filters.rating;

  // HERO CAROUSEL LOGIC
  let heroItems = products.filter((p) => p.isHero);

  if (filtersActive) {
    const filteredList = applyFilters(products);

    if (filteredList.length > 0) {
      heroItems = getRandomItems(filteredList, 3); // SHOW RANDOM FILTERED HEROES
    }
  }

  // Other sections
  const featuredProducts = applyFilters(products.filter((p) => p.isFeatured));
  const newArrivals = applyFilters(products.filter((p) => p.isNew));
  const discountedProducts = applyFilters(products.filter((p) => p.isDiscounted));

  // Widgets
  const featuredWidget = { title: "Featured Products", products: featuredProducts };
  const newArrivalsWidget = { title: "New Arrivals", products: newArrivals };
  const discountWidget = { title: "Hot Discounts", products: discountedProducts };

  return (
    <div className="home-page">

      {/* SEARCH BAR */}
      <SearchSection />

      {/* FILTERS LEFT + HERO RIGHT */}
      <div className="home-top-section">
        <div className="filters-left">
          <Filters setFilters={setFilters} />
        </div>

        <div className="hero-right">
          <HeroCarousel items={heroItems} />
        </div>
      </div>

      {/* FEATURED */}
      <ProductSlider widget={featuredWidget} />

      {/* NEW ARRIVALS */}
      <ProductGrid widget={newArrivalsWidget} />

      {/* DISCOUNTS */}
      <ProductDiscount widget={discountWidget} />

      {/* FILTERED RESULTS GRID */}
      {filtersActive && (
        <ProductGrid
          widget={{
            title: "Filtered Results",
            products: applyFilters(products),
          }}
        />
      )}
    </div>
  );
}

export default HomePage;
