"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSimilarVehicles } from "@/app/api/vehicleApi";
import "@/styles/BikeList.css";

export default function SimilarBikes({ bikeId }) {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bikeId) return;

    const fetchSimilar = async () => {
      try {
        const data = await getSimilarVehicles(bikeId);

        if (data?.data) {
          setSimilar(data.data);
        } else {
          setSimilar([]);
        }
      } catch (error) {
        console.log(error);
        setSimilar([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [bikeId]);

  if (loading) return null;

  return (
    <div className="spotlight-container">
      <h2 className="title">Similar Bikes</h2>

      <div className="card-row">
        {similar.length > 0 ? (
          similar.map((bike) => (
            <div className="bike-card" key={bike.vehicleId}>
              <div className="image-box">
                <div className="image-inner">
                  <img
                    src={
                      bike.images?.[0]?.imageUrl ||
                      "/placeholder-bike.png"
                    }
                    alt={bike.model}
                  />
                </div>
              </div>

              <h3>{bike.model}</h3>

              <p className="price">
                ₹{bike.price?.toLocaleString()}
              </p>

              <Link href={`/bikes/${bike.vehicleId}`}>
                <button className="offer-btn">
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-scooty-wrapper">
            <h3>No Similar Bikes Found</h3>
          </div>
        )}
      </div>
    </div>
  );
}
