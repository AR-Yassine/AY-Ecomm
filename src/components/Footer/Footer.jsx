import "./Footer.css";
import { FaInstagram, FaFacebookF, FaArrowUp } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">

      <div className="footer-content">

        {/* Left section */}
        <div className="footer-section">
          <h3>AY E-Comm</h3>
          <p>High-quality products. Fast delivery. Smooth experience.</p>
        </div>

        {/* Contact info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📞 +961 70 123 456</p>
          <p>📧 support@ayecomm.com</p>
        </div>

        {/* Social icons */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-icons">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          </div>
        </div>

      </div>

      <p className="footer-copy">
        © 2025 AY E-Comm. All Rights Reserved.  
        Developed by Abdel-Rahman Yassine — Student Project
      </p>

     <div className="back-to-top" onClick={scrollToTop}>
      <span className="arrow">↑</span>
      <span className="back-text">Top</span>
    </div>


    </footer>
  );
}

export default Footer;
