"use client";
import "@/styles/featuredOffers.css";
import Link from "next/link";

export default function FeaturedOffers() {
  return (
    <section className="fo-unique-wrapper">
      {/* 🎥 VIDEO */}
      <div className="fo-unique-card">
        <div className="fo-unique-video">
          <iframe
            src="https://www.youtube.com/watch?v=PSHTkGHfSVo"
            title="Offer Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>

      <div className="fo-unique-content">
        <h3>Your Next Ride Starts Here</h3>
        <p>
          From daily commutes to weekend rides, find two-wheelers you’ll love —
          without overpaying.
        </p>

             <Link href="/bikes">
          <button className="fo-unique-btn">Find My Bike</button>
        </Link>
      </div>
    </section>
  );
}
