"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilterBike from "@/components/bikes/FilterBike";
import "@/styles/HeroSlider.css";
import Link from "next/link";

const slides = [
  {
    id: 1,
    img: "https://4kwallpapers.com/images/wallpapers/ducati-panigale-v4--23802.jpg",
    title: "Find the Right Bike for You",
    subtitle: "Verified two-wheelers with transparent pricing .",
    desc: "Choose from a wide range of inspected bikes and scooters.",
    cta: "Browse Bikes",
    link: "/bikes",
  },
  {
    id: 2,
    img: "https://wallpapercave.com/wp/wp4934574.jpg  ",
    title: "Trusted Deals, No Hidden Costs",
    subtitle: "Quality-checked bikes and scooters you can rely on.",
    desc: "Every listing goes through checks so you get exactly ",
    cta: "Browse scooty",
    link: "/bikes",
  },
  {
    id: 3,
    img: "https://wallpapercave.com/wp/wp12415758.jpg",
    title: "Your Next Ride Starts Here",
    subtitle: "From daily commutes to weekend adventures.",
    desc: "Find the perfect two-wheeler .",
    cta: "FindNew",
    link: "/bikes",
  },
];

export default function HeroSlider({ onFilter }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="hero-slider-wrapper">
      <div className="hero-filter-overlay">
        <FilterBike onFilter={onFilter} />
      </div>

      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide-item ${index === current ? "active" : ""}`}
            style={{
              opacity: index === current ? 1 : 0,
              transform: `translateX(${(index - current) * 100}%)`,
            }}
          >
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${slide.img})` }}
            />
            <div className="slide-overlay" />

            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>

              <p className="slide-desc">{slide.desc}</p>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <Link href={slide.link} className="btn-primary">
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="nav-arrow prev" onClick={prevSlide}>
        <ChevronLeft />
      </button>
      <button className="nav-arrow next" onClick={nextSlide}>
        <ChevronRight />
      </button>
    </div>
  );
}
