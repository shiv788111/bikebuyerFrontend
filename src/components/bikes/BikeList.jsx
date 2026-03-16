"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/BikeList.css";
import {
  getVehiclesBySubCategory,
  getBikeVehicles,
} from "@/app/api/vehicleApi";

export default function BikeList() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("Popular");

  useEffect(() => {
    fetchBikes();
  }, [activeTab]);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      let data;

      // ✅ Popular = total bikes
      if (activeTab === "Popular") {
        data = await getBikeVehicles();
      }

      // ✅ SubCategory wise
      else if (activeTab === "Cruiser") {
        data = await getVehiclesBySubCategory("Cruiser Bike");
      } 
      else if (activeTab === "Sports") {
        data = await getVehiclesBySubCategory("sports bike");
      } 
      else if (activeTab === "Adventure") {
        data = await getVehiclesBySubCategory("Adventure Bike");
      }

      if (data?.success) {
        setBikes(data.vehicles || []);
      }
    } catch (err) {
      console.error("Bike fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const visibleBikes = showAll ? bikes : bikes.slice(0, 4);

 if (loading) {
  return (
    <div className="loader-wrapper">
      <div className="bike-loader"></div>
    </div>
  );
}

  if (bikes.length === 0) {
    return <p style={{ textAlign: "center" }}>No bikes found</p>;
  }

  return (
    <div className="spotlight-container">
      <h2 className="title">Bikes in Spotlight</h2>

      {/* Tabs */}
      <div className="tabs">
        {["Popular", "Cruiser", "Sports", "Adventure"].map((tab) => (
          <span
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              setActiveTab(tab);
              setShowAll(false);
            }}
          >
            {tab} Bikes
          </span>
        ))}
      </div>

      {/* Cards */}
      <div className="card-row">
        {visibleBikes.map((bike) => (
          <div className="bike-card" key={bike.vehicleId}>
            <div className="image-box">
              <div className="image-inner">
                <img
                  src={
                    bike.images?.[0]?.imageUrl ||
                    "/placeholder-bike.png"
                  }
                  alt={`${bike.brand?.name} ${bike.model}`}
                />
              </div>
            </div>

            <h3>
              {bike.brand?.name} {bike.model}
            </h3>

            <p className="price">
              ₹{bike.price?.toLocaleString()}
            </p>

            <Link href={`/bikes/${bike.vehicleId}`}>
              <button className="offer-btn">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {bikes.length > 4 && (
        <button
          className="view-all"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All Bikes"}
        </button>
      )}
    </div>
  );
}
