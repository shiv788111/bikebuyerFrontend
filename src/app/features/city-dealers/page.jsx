"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Search, Truck, ShieldCheck, FileText } from "lucide-react";
import "@/styles/featureOpenPage.css";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";
export default function CityDealersPage() {
  const [city, setCity] = useState("");
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  const handleSearch = () => {
    if (!city) return alert("Please enter a city name");
    alert(`Searching verified dealers in ${city}`);
  };

  const benefits = [
    { icon: Truck, text: "Faster Delivery" },
    { icon: FileText, text: "Easy Documentation" },
    { icon: ShieldCheck, text: "Trusted Local Sellers" },
    { icon: MapPin, text: "Nearby Service Support" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`feature-page ${visible ? "show" : ""}`}
    >
      <div className="container">
        <h1>City-Based Dealers</h1>

        <p>
          Discover verified bike dealers in your city. Buy locally for faster
          delivery, easier paperwork, and better after-sales support.
        </p>

        {/* Search Box */}
      

        {/* Benefits Grid */}
        <div className="benefits-grid">
          {benefits.map((item, i) => (
            <div
              className="benefit-card"
              key={i}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <item.icon className="benefit-icon" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="highlight-box">
          <h3>Buy Local. Ride Sooner.</h3>
          <p>
            Choosing a dealer from your city means faster handover, smoother
            communication, and trusted service support near you.
          </p>
        </div>


        <div className="cta-section">
          <button className="cta-btn">Explore Dealers</button>
        </div>
                <div className="back-home">
<Link href="/" className="back-btn">
  <ArrowLeft size={16} /> Back to Home
</Link>
</div>
      </div>
    </section>
  );
}