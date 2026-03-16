
"use client";

import "@/styles/trendingBrands.css";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getAllBrands, getFilteredVehicles } from "@/app/api/vehicleApi";

export default function TrendingBrands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandBikes, setBrandBikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const bikesSectionRef = useRef(null);
  const carouselRef = useRef(null);

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getAllBrands();
        setBrands(data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBrands();
  }, []);

  // 🔥 JS AUTO SLIDER
 useEffect(() => {
  const slider = carouselRef.current;
  if (!slider) return;

  let scrollAmount = 0;
  let interval;

  const startSlider = () => {
    interval = setInterval(() => {
      slider.scrollLeft += 1;
      scrollAmount += 1;

      if (scrollAmount >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
        scrollAmount = 0;
      }
    }, 20);
  };

  const stopSlider = () => {
    clearInterval(interval);
  };

  // Start on load
  startSlider();

  // Pause on hover
  slider.addEventListener("mouseenter", stopSlider);
  slider.addEventListener("mouseleave", startSlider);

  return () => {
    clearInterval(interval);
    slider.removeEventListener("mouseenter", stopSlider);
    slider.removeEventListener("mouseleave", startSlider);
  };
}, [brands]);

  // Brand click
  const handleBrandClick = async (brandName) => {
    setSelectedBrand(brandName);
    setLoading(true);

    try {
      const data = await getFilteredVehicles({
        brandName: brandName,
      });

      setBrandBikes(data?.vehicles || []);

      setTimeout(() => {
        bikesSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    } catch (error) {
      console.log(error);
      setBrandBikes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="brand-section">
      <div className="brand-header">
        <h2>Top Bike Brands</h2>
        <p>India’s most trusted two-wheeler brands</p>
      </div>

      {/* 🔥 JS Slider */}
      <div className="tb-carousel" ref={carouselRef}>
        <div className="tb-track">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className={`tb-card ${
                selectedBrand === brand.name ? "tb-active" : ""
              }`}
              onClick={() => handleBrandClick(brand.name)}
            >
              <img
                src={
                  brand.logo ||
                  "https://via.placeholder.com/80?text=Brand"
                }
                alt={brand.name}
              />
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bikes Section */}
      {selectedBrand && (
        <div className="brand-bikes-section" ref={bikesSectionRef}>
          <h3>{selectedBrand} Bikes</h3>

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading bikes...</p>
          ) : brandBikes.length === 0 ? (
            <div className="empty-state">
              <img
                src="https://cliply.co/wp-content/uploads/2021/03/392103840_SAD_EMOJI_WITH_TEAR_400px.gif"
                alt="No Bikes"
              />
              <h3>No Bikes Found</h3>
              <p>New bikes will be added soon 🚀</p>
            </div>
          ) : (
            <div className="card-row">
              {brandBikes.map((bike) => (
                <div className="bike-card" key={bike.vehicleId}>
                  <img
                    src={
                      bike.images?.[0]?.imageUrl ||
                      "/placeholder-bike.png"
                    }
                    alt={`${bike.brand?.name} ${bike.model}`}
                  />
                  <h4>
                    {bike.brand?.name} {bike.model}
                  </h4>
                  <p>₹{bike.price?.toLocaleString()}</p>
                  <Link href={`/bikes/${bike.vehicleId}`}>
                    <button className="offer-btn">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}