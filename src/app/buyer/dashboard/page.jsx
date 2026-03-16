"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import "@/styles/buyerDashboard.css";

export default function BuyerDashboard() {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [emails, setEmails] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [visible, setVisible] = useState(false);

  const name =
    typeof window !== "undefined" ? localStorage.getItem("name") : "Buyer";

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("email")
      : "buyer@email.com";

  useEffect(() => {
    setVisible(true);

    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");

    // ✅ Dummy Enquiries (with image)
    setRequests([
      {
        id: 1,
        bike: "Honda Activa 6G",
        price: "₹65,000",
        status: "Pending",
        image:
          "https://www.joyebike.com/product/beast/images/banner-img-mobile.png",
      },
      {
        id: 2,
        bike: "Hero Splendor Plus",
        price: "₹48,000",
        status: "Accepted",
        image:
          "https://www.bajajfinservmarkets.in/content/dam/bajajmarkets/blog-assets/listing-pages/60-percent-top-banner/how-to-register-a-modified-bike.webp",
      },
    ]);

    // ✅ Dummy Wishlist
    setWishlist([
      {
        id: 3,
        bike: "TVS Raider",
        price: "₹95,000",
        image:
          "https://i.pinimg.com/474x/5a/9d/04/5a9d04646ca09c1c40528f80966c0b7e.jpg",
      },
      {
        id: 4,
        bike: "Yamaha R15",
        price: "₹1,45,000",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvd5LzswJSt5ZATVzz7sJATmQqEW-g-s9rNcl3M_gBFJz6t8tdf9pmAUbYGBtj2oDkGbA&usqp=CAU",
      },
    ]);

    // ✅ Dummy Emails
    setEmails([
      {
        id: 5,
        subject: "Regarding Your Enquiry",
        message: "Dealer will contact you within 24 hours.",
      },
      {
        id: 6,
        subject: "Price Update",
        message: "Dealer has reduced ₹2,000 from listed price.",
      },
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("userLogin"));
    router.push("/auth/login");
  };

  return (
    <section className={`feature-page ${visible ? "show" : ""}`}>
      <div className="container">
        <h1>Welcome Back, {name}</h1>
        <p>Your personalized dashboard overview.</p>

        {/* ================= DASHBOARD CARDS ================= */}
        <div className="dashboard-grid">
          <div
            className="dashboard-card"
            onClick={() => setActiveSection("wishlist")}
          >
            <span>❤️</span>
            <h3>Wishlist</h3>
          </div>

          <div
            className="dashboard-card"
            onClick={() => setActiveSection("enquiry")}
          >
            <span>🔎</span>
            <h3>My Enquiries</h3>
          </div>

          <div
            className="dashboard-card email-card"
            onClick={() => setActiveSection("email")}
          >
            <span>📧</span>
            <h3>Email</h3>
            <p className="email-text">{email}</p>
          </div>
        </div>

        {/* ================= WISHLIST ================= */}
        {activeSection === "wishlist" && (
          <div className="info-box">
            <div className="box-header">
              <h3>My Wishlist</h3>
              <X
                className="close-icon"
                onClick={() => setActiveSection(null)}
              />
            </div>

            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.bike} />
                <div>
                  <strong>{item.bike}</strong>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= ENQUIRIES ================= */}
        {activeSection === "enquiry" && (
          <div className="info-box">
            <div className="box-header">
              <h3>My Enquiries</h3>
              <X
                className="close-icon"
                onClick={() => setActiveSection(null)}
              />
            </div>

            {requests.map((req) => (
              <div key={req.id} className="wishlist-item">
                <img src={req.image} alt={req.bike} />
                <div>
                  <strong>{req.bike}</strong>
                  <p>{req.price}</p>
                  <span className={`status ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= EMAIL ================= */}
        {activeSection === "email" && (
          <div className="info-box">
            <div className="box-header">
              <h3>Admin Replies</h3>
              <X
                className="close-icon"
                onClick={() => setActiveSection(null)}
              />
            </div>

            {emails.map((mail) => (
              <div key={mail.id} className="request-item">
                <div>
                  <strong>{mail.subject}</strong>
                  <p>{mail.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= LOGOUT ================= */}
        <div className="logout-wrapper">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
