"use client";
import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaRegEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "@/styles/footer.css";
import Link from "next/link";
import { subscribeNewsletterApi } from "@/app/api/userApi";

export default function Footer() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);

 const handleNewsletter = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;

  setLoading(true); // start loading

  try {
    await subscribeNewsletterApi(email);

    setToast({
      show: true,
      message: "Successfully Subscribed to Newsletter!",
      type: "success",
    });

    e.target.reset();
  } catch (error) {
    setToast({
      show: true,
      message: error.message || "Something went wrong!",
      type: "error",
    });
  }

  setLoading(false); // stop loading

  setTimeout(() => {
    setToast({ show: false, message: "", type: "success" });
  }, 3000);
};

  return (
    <>
      {/* ===== Custom Toast ===== */}
      {toast.show && (
        <div className={`bb-toast ${toast.type}`}>
          <div className="bb-toast-content">
            {toast.type === "success" ? (
              <FaCheckCircle className="bb-toast-icon" />
            ) : (
              <FaTimesCircle className="bb-toast-icon" />
            )}
            <span>{toast.message}</span>
          </div>
          <div className="bb-toast-progress"></div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/024/207/679/small/vintage-motorcycle-cartoon-logo-with-ai-generative-free-png.png"
                alt="BikeBuyer Logo"
                className="footer-logo"
              />
            </Link>

            <div className="footer-brand-links">
              <a href="/about">About Us</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/sell">Sell Your Bike</a>
              </li>
              <li>
                <a href="/bikes">Browse Bikes</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter-section">
            <h3>Join Our Community</h3>
            <form className="footer-newsletter" onSubmit={handleNewsletter}>
              <div className="input-group">
                <FaRegEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                />
              </div>
           <button type="submit" disabled={loading}>
  {loading ? "Sending..." : "Send Now"}
</button>
            </form>
            <span className="newsletter-note">
              Get exclusive deals, new listings & biking tips
            </span>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <p>
              <FaMapMarkerAlt /> Delhi, India - 110001
            </p>
            <p>
              <FaPhone /> +91 98765 43210
            </p>
            <p>
              <FaRegEnvelope /> support@bikebuyer.com
            </p>

            <div className="footer-social">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 BikeBuyer · Find your perfect ride today!</p>
        </div>
      </footer>
    </>
  );
}
