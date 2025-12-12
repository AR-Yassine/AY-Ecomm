// UPDATED AllProducts.jsx (FIXED NAME ERROR)

import "./AllProducts.css";
import { useState } from "react";
import { products } from "../../data/products";

import Filters from "../../components/Filters/Filters";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductDiscount from "../../components/ProductDiscount/ProductDiscount";
import SearchSection from "../../components/SearchSection/SearchSection";

function AllProducts() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = (list) =>
    list.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.minPrice && p.price < filters.minPrice) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (filters.rating && p.rating < filters.rating) return false;
      return true;
    });

  const filteredList = applyFilters(products);
  const isFiltering = searchQuery || Object.keys(filters).length > 0;

  return (
    <div className="all-products-page">
      <SearchSection setSearchQuery={setSearchQuery} />

      <div className="products-layout">
        <aside className="filters-sidebar">
          <Filters setFilters={setFilters} />
        </aside>

        <main className="products-content">
          {isFiltering ? (
            <ProductGrid widget={{ title: "", products: filteredList }} />
          ) : (
            <>
              <ProductDiscount
                widget={{
                  title: "Hot Deals",
                  products: products.filter((p) => p.isDiscounted),
                }}
              />

              <ProductSlider widget={{ title: "", products: products.filter((p) => p.section === "Fashion") }} />
              <ProductSlider widget={{ title: "", products: products.filter((p) => p.section === "Watches") }} />
              <ProductSlider widget={{ title: "", products: products.filter((p) => p.section === "Footwear") }} />
              <ProductSlider widget={{ title: "", products: products.filter((p) => p.section === "Tech Gadgets") }} />
              <ProductSlider widget={{ title: "", products: products.filter((p) => p.section === "Cameras") }} />
              <ProductGrid widget={{ title: "", products: products.filter((p) => p.section === "Accessories") }} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AllProducts;
