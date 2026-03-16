
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import HeroSlider from "@/components/home/HeroSlider";
import WhyBikeBuyer from "@/components/home/WhyBikeBuyer";
import TrendingBrands from "@/components/home/TrendingBrands";
import FeaturedOffers from "@/components/home/FeaturedOffers";
import BikeList from "@/components/bikes/BikeList";
import ScootyList from "@/components/bikes/ScootyList";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import LatestBikes from "@/components/home/LatestBikes";
import { getFilteredVehicles, getNearbyBikes } from "@/app/api/vehicleApi";

export default function HomePage() {
  const [filteredVehicles, setFilteredVehicles] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleFilter = async (filters) => {
    setLoading(true);

    try {
      const res = await getFilteredVehicles(filters);
      setFilteredVehicles(res?.vehicles || []);
    } catch (err) {
      setFilteredVehicles([]);
    } finally {
      setLoading(false);
    }
  };
  //   const fetchBikes = async () => {
  //     const lat = localStorage.getItem("userLat");
  //     const lng = localStorage.getItem("userLng");
  //     const savedLocation = localStorage.getItem("selectedLocation");

  //     setLoading(true);

  //     try {
  //       if (lat && lng) {
  //         const res = await getNearbyBikes(lat, lng);
  //         setFilteredVehicles(res?.bikes || []);
  //       } else if (savedLocation) {
  //         const parsed = JSON.parse(savedLocation);
  //         const cleanCity = parsed.name.split(",")[0];
  //         const res = await getFilteredVehicles({ city: cleanCity });
  //         setFilteredVehicles(res?.vehicles || []);
  //       } else {
  //         setFilteredVehicles(null);
  //       }
  //     } catch (err) {
  //       setFilteredVehicles([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBikes();
  // }, [searchParams]); 


useEffect(() => {
  const fetchBikes = async () => {

    const searchQuery = searchParams.get("search");
    const lat = localStorage.getItem("userLat");
    const lng = localStorage.getItem("userLng");
    const savedLocation = localStorage.getItem("selectedLocation");

    setLoading(true);

    try {

      // 🔍 1️⃣ Search priority sabse pehle
      if (searchQuery) {
        const res = await getFilteredVehicles({ search: searchQuery });
        setFilteredVehicles(res?.vehicles || []);
      }

      // 📍 2️⃣ GPS
      else if (lat && lng) {
        const res = await getNearbyBikes(lat, lng);
        setFilteredVehicles(res?.bikes || []);
      }

      // 🏙 3️⃣ Manual City
      else if (savedLocation) {
        const parsed = JSON.parse(savedLocation);
        const cleanCity = parsed.name.split(",")[0];

        const res = await getFilteredVehicles({ city: cleanCity });
        setFilteredVehicles(res?.vehicles || []);
      }

      // 🌍 Default
      else {
        setFilteredVehicles(null);
      }

    } catch (err) {
      setFilteredVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  fetchBikes();
}, [searchParams]);


  return (
    <>
      <HeroSlider onFilter={handleFilter} />

      <div id="latest-section">
        <LatestBikes filteredData={filteredVehicles} loading={loading} />
      </div>

      <BikeList />
      <WhyBikeBuyer />
      <FeaturedOffers />
      <ScootyList />
      <TrendingBrands />
      <RecentlyViewed />
    </>
  );
}
