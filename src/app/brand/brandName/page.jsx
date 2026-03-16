"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBuyerVehicles } from "@/app/api/vehicleApi";
import "@/styles/brandPage.css";

export default function BrandPage() {
  const { brandName } = useParams();

  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBikes = async () => {
      setLoading(true);
      try {
        const data = await getBuyerVehicles({ brandName });
        setBikes(data?.vehicles || []);
      } catch (error) {
        console.log(error);
        setBikes([]);
      } finally {
        setLoading(false);
      }
    };

    if (brandName) fetchBikes();
  }, [brandName]);

  return (
    <div className="brand-page">
      <h2 className="brand-title">{brandName} Bikes</h2>

      {loading ? (
        <p className="loading-text">Loading bikes...</p>
      ) : bikes.length === 0 ? (
       <div className="empty-state">
  <div className="emoji-bike">🏍️</div>
  <h3>Coming Soon</h3>
  <p>
    Bikes from <strong>{brandName}</strong> will be available very soon.
  </p>
</div>
      ) : (
        <div className="bike-grid">
          {bikes.map((bike) => (
            <div className="bike-card" key={bike.vehicleId}>
              <img
                src={
                  bike.images?.[0]?.imageUrl ||
                  "/placeholder-bike.png"
                }
                alt={`${bike.brand?.name} ${bike.model}`}
              />
              <div className="bike-info">
                <h4>
                  {bike.brand?.name} {bike.model}
                </h4>
                <p>₹{bike.price?.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}