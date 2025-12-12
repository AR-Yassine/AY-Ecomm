import "./AllProducts.css";

import { useState } from "react";
import { products } from "../../data/products";

import Filters from "../../components/Filters/Filters";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductDiscount from "../../components/ProductDiscount/ProductDiscount";
import SearchSection from "../../components/SearchSection/SearchSection";

function AllProductsPage() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const applyFilters = (list) =>
    list.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.rating && p.rating < Number(filters.rating)) return false;
      return true;
    });

  const filteredList = applyFilters(products);

  const isFiltering =
    searchQuery ||
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.rating;

  // WIDGETS (same as before)
  const discountWidget = {
    title: "Hot Deals",
    products: products.filter((p) => p.isDiscounted),
  };

  const fashionWidget = {
    title: "",
    products: products.filter((p) => p.section === "Fashion"),
  };

  const watchesWidget = {
    title: "",
    products: products.filter((p) => p.section === "Watches"),
  };

  const sneakersWidget = {
    title: "",
    products: products.filter((p) => p.section === "Footwear"),
  };

  const techWidget = {
    title: "",
    products: products.filter((p) => p.section === "Tech Gadgets"),
  };

  const camerasWidget = {
    title: "",
    products: products.filter((p) => p.section === "Cameras"),
  };

  const accessoriesWidget = {
    title: "",
    products: products.filter((p) => p.section === "Accessories"),
  };

  return (
    <div className="all-products-page">

      {/* SEARCH BAR ADDED HERE */}
      <SearchSection setSearchQuery={setSearchQuery} />

      <h1 className="store-title">Explore All Products</h1>

      <div className="products-layout">

        {/* LEFT FILTERS */}
        <aside className="filters-sidebar">
          <Filters setFilters={setFilters} />
        </aside>

        {/* MAIN CONTENT */}
        <main className="products-content">

          {/* FILTER MODE = Only Grid */}
          {isFiltering ? (
            <ProductGrid
              widget={{
                title: "",
                products: filteredList,
              }}
            />
          ) : (
            <div className="non-filter-content">

              <ProductDiscount widget={discountWidget} />
              <ProductSlider widget={fashionWidget} />
              <ProductSlider widget={watchesWidget} />
              <ProductSlider widget={sneakersWidget} />
              <ProductSlider widget={techWidget} />
              <ProductSlider widget={camerasWidget} />
              <ProductGrid widget={accessoriesWidget} />

            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default AllProductsPage;
