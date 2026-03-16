"use client";

import { ShieldCheck, BadgePercent, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "@/styles/whyBikeBuyer.css";
import Link from "next/link";

export default function WhyBikeBuyer() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Counters
  const [users, setUsers] = useState(0);
  const [dealers, setDealers] = useState(0);
  const [vehicles, setVehicles] = useState(0);

  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Dealers",
      desc: "100% trusted sellers",
      link: "/features/verified-dealers",
    },
    {
      icon: BadgePercent,
      title: "Best Price Guarantee",
      desc: "Lowest market price",
      link: "/features/best-price",
    },
    {
      icon: MapPin,
      title: "City-Based Dealers",
      desc: "Available in your city",
      link: "/features/city-dealers",
    },
  ];

  /* ===== Scroll Reveal ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  /* ===== Auto Counter ===== */
  useEffect(() => {
    if (!visible) return;

    const animate = (setter, target, duration = 1200) => {
      let start = 0;
      const increment = target / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(counter);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animate(setUsers, 100000);
    animate(setDealers, 500);
    animate(setVehicles, 1000);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className={`why-section ${visible ? "show" : ""}`}
    >
      {/* Header */}
      <div className="why-header reveal">
        <span className="why-badge">WHY CHOOSE US</span>
        <h2>Why BikeBuyer?</h2>
        <p>Everything you need to buy the perfect bike.</p>
      </div>

      {/* Cards */}
      <div className="why-grid">
        {features.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className="why-card reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <item.icon className="why-icon" />
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="why-stats reveal">
        <div>
          <h3>{users.toLocaleString()}+</h3>
          <span>Happy Users</span>
        </div>
        <div>
          <h3>{dealers}+</h3>
          <span>Verified Dealers</span>
        </div>
        <div>
          <h3>{vehicles}+</h3>
          <span>Vehicles Listed</span>
        </div>
      </div>
    </section>
  );
}
