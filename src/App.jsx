import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

// Pages
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

// FIXED imports
import ContactPage from "./pages/Contact/Contact.jsx";
import ReviewsPage from "./pages/Reviews/Reviews.jsx";
import AboutPage from "./pages/About/About.jsx";
import AllProductsPage from "./pages/AllProducts/AllProducts.jsx";
import Footer from "./components/Footer/Footer";


function App() {
  return (
<>
  <Navbar />

  <div className="page-content">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<AllProductsPage />} />
    </Routes>
  </div>

  <Footer />
</>

  );
}

export default App;
