"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getScootyVehicles,
  getVehiclesBySubCategory,
} from "@/app/api/vehicleApi";

export default function ScootyList() {
  const [scooters, setScooters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubCategory, setActiveSubCategory] = useState("");

  useEffect(() => {
    fetchAllScooties();
  }, []);

  const fetchAllScooties = async () => {
    try {
      setLoading(true);
      setActiveSubCategory("");
      const data = await getScootyVehicles();
      setScooters(data?.vehicles || []);
    } catch (err) {
      console.error(err);
      setScooters([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBySubCategory = async (subCategoryName) => {
    try {
      setLoading(true);
      setActiveSubCategory(subCategoryName);
      const data = await getVehiclesBySubCategory(subCategoryName);
      setScooters(data?.vehicles || []);
    } catch (err) {
      console.error(err);
      setScooters([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spotlight-container">
      <h2 className="title">Scooters in Spotlight</h2>

      <div className="tabs">
        <span
          className={!activeSubCategory ? "active" : ""}
          onClick={fetchAllScooties}
        >
          All Scooty
        </span>

        <span
          className={activeSubCategory === "125cc Scooty" ? "active" : ""}
          onClick={() => fetchBySubCategory("125cc Scooty")}
        >
          125cc Scooty
        </span>

        <span
          className={activeSubCategory === "Electric Scooty" ? "active" : ""}
          onClick={() => fetchBySubCategory("Electric Scooty")}
        >
          Electric Scooty
        </span>

        <span
          className={activeSubCategory === "Petrol Scooty" ? "active" : ""}
          onClick={() => fetchBySubCategory("Petrol Scooty")}
        >
          Petrol Scooty
        </span>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {!loading && scooters.length === 0 && (
        <div className="scooty-empty-box">
          <img
            src="https://cliply.co/wp-content/uploads/2021/03/392103840_SAD_EMOJI_WITH_TEAR_400px.gif"
            alt="Not Found"
            className="scooty-empty-gif"
          />
          <h3>No Scooties Available</h3>
          <p>New models coming soon 🚀</p>
          <span className="scooty-coming-soon">Coming Soon</span>
        </div>
      )}

      {!loading && scooters.length > 0 && (
        <div className="card-row">
          {scooters.map((item) => (
            <div key={item.vehicleId} className="bike-card">
              <div className="image-box">
                <img
                  src={item.images?.[0]?.imageUrl || "/placeholder-bike.png"}
                  alt={item.model}
                />
              </div>

              <h3>
                {item.brand?.name} {item.model}
              </h3>

              <p className="price">₹{item.price?.toLocaleString()}</p>

              <Link href={`/bikes/${item.vehicleId}`}>
                <button className="offer-btn">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
