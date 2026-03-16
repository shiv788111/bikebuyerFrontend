



"use client";
import "@/styles/featureOpenPage.css";

import { useEffect, useRef, useState } from "react";
import { BadgePercent, ShieldCheck, CreditCard, Tag } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BestPricePage() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  const benefits = [
    { icon: ShieldCheck, text: "Direct Dealer Pricing" },
    { icon: CreditCard, text: "No Hidden Charges" },
    { icon: Tag, text: "Transparent Breakdown" },
    { icon: BadgePercent, text: "Exclusive Platform Offers" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`feature-page ${visible ? "show" : ""}`}
    >
      <div className="container">
        <h1>Best Price Guarantee</h1>

        <p>
          We ensure you always get the most competitive and transparent
          pricing from verified dealers across your city.
        </p>

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
          <h3>Price Match Promise</h3>
          <p>
            Found a lower price elsewhere? We’ll match it — because your trust
            matters more than profit.
          </p>
        </div>

        <div className="cta-section">
          <button className="cta-btn">Browse Available Bikes</button>
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