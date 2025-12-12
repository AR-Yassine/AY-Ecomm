import "./Contact.css";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiSend } from "react-icons/fi";

function ContactPage() {
  return (
    <div className="contact-wrapper">

      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-subtitle">We typically reply within a few hours. How can we assist you today?</p>

      <div className="contact-container">

        {/* LEFT INFO CARD */}
        <div className="contact-info">
          <h2>Contact Information</h2>

          <div className="info-item">
            <FiMail className="icon" />
            <span>support@ayecomm.com</span>
          </div>

          <div className="info-item">
            <FiPhone className="icon" />
            <span>+961 70 123 456</span>
          </div>

          <div className="info-item">
            <FiMapPin className="icon" />
            <span>Beirut, Lebanon</span>
          </div>

          <div className="social-links">
            <a><FiInstagram /></a>
            <a><FiFacebook /></a>
          </div>

          <div className="map-box">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=Beirut&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Your Message..." rows="6" required />

          <button type="submit" className="send-btn">
            <FiSend className="send-icon" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
