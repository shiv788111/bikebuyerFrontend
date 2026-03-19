"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/BikeList.css";
import {
  getVehiclesBySubCategory,
  getBikeVehicles,
  getNearbyBikes 
} from "@/app/api/vehicleApi";

export default function BikeList() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("Popular");
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const city = searchParams.get("city");

  useEffect(() => {
    fetchBikes();
  }, [activeTab, search, city]);


useEffect(() => {
  if (city) {
    localStorage.removeItem("userLat");
    localStorage.removeItem("userLng");
  }
}, [city]);

  


  // const fetchBikes = async () => {
  //   try {
  //     setLoading(true);
  //     let data;

  //     // ✅ Popular = total bikes
  //     if (activeTab === "Popular") {
  //       data = await getBikeVehicles({ search, city });
  //     }

  //     // ✅ SubCategory wise
  //     else if (activeTab === "Cruiser") {
  //       data = await getVehiclesBySubCategory("Cruiser Bike", { search, city });
  //     } else if (activeTab === "Sports") {
  //       data = await getVehiclesBySubCategory("sports bike", { search, city });
  //     } else if (activeTab === "Adventure") {
  //       data = await getVehiclesBySubCategory("Adventure Bike", {
  //         search,
  //         city,
  //       });
  //     }

  //     if (data?.success) {
  //       setBikes(data.vehicles || []);
  //     }
  //   } catch (err) {
  //     console.error("Bike fetch error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


const fetchBikes = async () => {
  try {
    setLoading(true);

    const lat = localStorage.getItem("userLat");
    const lng = localStorage.getItem("userLng");

    let data;

    // ✅ 1. Agar GPS hai → Nearby bikes
    if (lat && lng) {
      data = await getNearbyBikes(lat, lng);
    }

    // ✅ 2. Agar GPS nahi → Normal search / city
    else {
      if (activeTab === "Popular") {
        data = await getBikeVehicles({ search, city });
      } else if (activeTab === "Cruiser") {
        data = await getVehiclesBySubCategory("Cruiser Bike");
      } else if (activeTab === "Sports") {
        data = await getVehiclesBySubCategory("sports bike");
      } else if (activeTab === "Adventure") {
        data = await getVehiclesBySubCategory("Adventure Bike");
      }
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
                  src={bike.images?.[0]?.imageUrl || "/placeholder-bike.png"}
                  alt={`${bike.brand?.name} ${bike.model}`}
                />
              </div>
            </div>

            <h3>
              {bike.brand?.name} {bike.model}
            </h3>

            <p className="price">₹{bike.price?.toLocaleString()}</p>

            <Link href={`/bikes/${bike.vehicleId}`}>
              <button className="offer-btn">View Details</button>
            </Link>
          </div>
        ))}
      </div>

      {bikes.length > 4 && (
        <button className="view-all" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All Bikes"}
        </button>
      )}
    </div>
  );
}
