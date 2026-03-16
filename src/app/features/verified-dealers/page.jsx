"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, UserCheck, BadgeCheck, FileCheck } from "lucide-react";
import "@/styles/featureOpenPage.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VerifiedDealersPage() {
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

  const points = [
    { icon: UserCheck, text: "Identity & Document Verified" },
    { icon: BadgeCheck, text: "Trusted & Rated Sellers" },
    { icon: FileCheck, text: "Proper Business Registration" },
    { icon: ShieldCheck, text: "Secure & Transparent Transactions" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`feature-page ${visible ? "show" : ""}`}
    >
      <div className="container">
        <h1>Verified Dealers</h1>

        <p>
          Every dealer on BikeBuyer goes through a strict verification process
          to ensure safe, transparent, and trustworthy transactions.
        </p>

        <div className="benefits-grid">
          {points.map((item, i) => (
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
          <h3>Your Safety Comes First</h3>
          <p>
            We carefully review documents, business details, and dealer history
            so you can buy with complete confidence.
          </p>
        </div>

        <div className="cta-section">
          <button className="cta-btn">View Verified Dealers</button>
        </div>
      </div>
                      <div className="back-home">
<Link href="/" className="back-btn">
  <ArrowLeft size={16} /> Back to Home
</Link>
</div>
    </section>
  );
}