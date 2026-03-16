"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/BikeList.css";
import { getBuyerVehicles } from "../../app/api/vehicleApi";

export default function LatestBikes({ filteredData, loading }) {
  const [vehicles, setVehicles] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getBuyerVehicles();
      if (data?.success) {
        setVehicles(data.vehicles || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLocalLoading(false);
    }
  };

  // 🔥 Detect filtering properly
  const isFiltering = filteredData !== null;

  const finalData = isFiltering ? filteredData : vehicles;

  const visibleBikes = showAll ? finalData : finalData.slice(0, 8);

  // 🔥 Loader
  if (loading || localLoading) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>Loading bikes...</p>
    );
  }

  return (
    <div className="spotlight-container">
      <h2 className="title">
        {isFiltering ? "Filtered Results" : "Latest Bikes & Scooters"}
      </h2>

      <div className="tabs">
        <span className="active">Latest Launches</span>
      </div>

      <div className="card-row">
        {visibleBikes.length > 0 ? (
          visibleBikes.map((bike) => (
            <div className="bike-card" key={bike.vehicleId}>
              <div className="image-box">
                <div className="image-inner">
                  <img
                    src={bike.images?.[0]?.imageUrl || "/placeholder-bike.png"}
                    alt={`${bike.brand?.name || ""} ${bike.model}`}
                  />
                </div>
              </div>

              <h3>
                {bike.brand?.name || "Unknown"} {bike.model}
              </h3>

              <p className="price">₹{bike.price?.toLocaleString()}</p>

              <Link href={`/bikes/${bike.vehicleId}`}>
                <button className="offer-btn">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-scooty-wrapper">
            {/* <img
    src="https://cliply.co/wp-content/uploads/2021/03/392103840_SAD_EMOJI_WITH_TEAR_400px.gif"
    alt="Not Found"
    className="no-scooty-gif"
  /> */}
            <h3>No vehicle Available</h3>

            <span className="no-scooty-tag">Coming Soon</span>
          </div>
        )}
      </div>

      {finalData.length > 8 && (
        <button className="view-all" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All Latest Bikes"}
        </button>
      )}
    </div>
  );
}
