
"use client";

import { useState } from "react";
import "@/styles/filterBike.css";

export default function FilterBike({ onFilter }) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("all");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleApply = () => {
    if (onFilter)
      onFilter({
        search,
        minPrice,
        maxPrice,
        city,
        category: type === "all" ? undefined : type,
      });
  };

  return (
    <div className="filter-container">
      <h1>Find the Right Bike for You</h1>

      {/* Search brand / model */}
      <div className="filter-row" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search brand / model"
          value={search}
          onChange={async (e) => {
            const value = e.target.value;
            setSearch(value);

            if (value.length >= 1) {
              try {
                const res = await fetch(
                  `https://api.bikesbuyer.com/api/buyer/suggestions?search=${value}`,
                );
                const data = await res.json();

                setSuggestions(data.suggestions || []);
                setShowSuggestions(true);
              } catch {
                setSuggestions([]);
                setShowSuggestions(false);
              }
            } else {
              setSuggestions([]);
              setShowSuggestions(false);
            }
          }}
        />

        {/* ✅ Suggestion Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="filter-suggestions">
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="filter-suggestion-item"
                onClick={() => {
                  const modelName = item.split(" ").slice(1).join(" ");
                  setSearch(modelName);
                  setShowSuggestions(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Min Price */}
      <div className="filter-row">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>

      {/* Max Price */}
      <div className="filter-row">
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* City */}
      <div className="filter-row">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Type */}
      <div className="filter-row">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="bike">Bike</option>
          <option value="scooty">Scooty</option>
        </select>
      </div>

      <button className="filter-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
}
