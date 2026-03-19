"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import "@/styles/navbar.css";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { useRef } from "react";

export default function Navbar() {
  const inputRef = useRef(null);
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Bikes dropdown
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // Mobile dropdown
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const locations = []; // Your locations array

  // Handle body scroll when mobile menu opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close mobile menu on resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Google Places Autocomplete
  useEffect(() => {
    if (!window.google || !locationModalOpen) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["(cities)"],
        componentRestrictions: { country: "in" },
      },
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      let city = "";
      let state = "";

      place.address_components.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }
      });

      const locationObj = {
        id: Date.now(),
        name: `${city}, ${state}`,
      };

      setSelectedLocation(locationObj);
      localStorage.setItem("selectedLocation", JSON.stringify(locationObj));
      setLocationModalOpen(false);
      router.push(`/?city=${encodeURIComponent(locationObj.name)}`);
    });
  }, [locationModalOpen, router]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    // ❌ REMOVE current location
    localStorage.removeItem("userLat");
    localStorage.removeItem("userLng");

    const city = selectedLocation?.name || "";

    // 🔥 HARD RELOAD (IMPORTANT)
    window.location.href = `/?search=${encodeURIComponent(search)}&city=${encodeURIComponent(city)}`;
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user name from localStorage
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  // Listen for login events
  useEffect(() => {
    const handleLogin = () => {
      const name = localStorage.getItem("name");
      setUserName(name);
    };
    window.addEventListener("userLogin", handleLogin);
    return () => {
      window.removeEventListener("userLogin", handleLogin);
    };
  }, []);

  // Clean up location on unload
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("userLat");
      localStorage.removeItem("userLng");
      localStorage.removeItem("selectedLocation");
    });
  }, []);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <header className={`bb-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="bb-navbar__container">
        {/* Logo */}
        <Link href="/" className="bb-navbar__logo" onClick={closeMenu}>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/024/207/679/small/vintage-motorcycle-cartoon-logo-with-ai-generative-free-png.png"
            alt="BikeBuyer Logo"
            className="bb-logo-img"
          />
        </Link>

        {/* Location button */}
        <button
          className="location-btn"
          onClick={() => {
            setLocationModalOpen(true);
            setLocationSearch("");
            setSearchResults([]);
            closeMenu(); // Close mobile menu if open
          }}
        >
          <FaMapMarkerAlt />
          <span className="location-text">
            {selectedLocation ? selectedLocation.name : "Select Location"}
          </span>
          <FaChevronDown style={{ marginLeft: "4px", fontSize: "12px" }} />
        </button>

        {/* Search bar */}
        <form className="bb-navbar__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search bikes, scooters..."
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

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    const modelName = item.split(" ").slice(1).join(" ");
                    localStorage.removeItem("userLat");
                    localStorage.removeItem("userLng");
                    setSearch(modelName);
                    setShowSuggestions(false);
                    router.push(`/?search=${encodeURIComponent(modelName)}`);
                    closeMenu();
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {/* Desktop Navigation Links */}
        <nav className="bb-navbar__links">
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>

          {/* Desktop Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="dropdown-toggle">
              Bikes{" "}
              <FaChevronDown style={{ fontSize: "12px", marginLeft: "4px" }} />
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/bikes" onClick={closeMenu}>
                  Motorcycles
                </Link>
                <Link href="/bikes?category=scooty" onClick={closeMenu}>
                  Scooters
                </Link>
              </div>
            )}
          </div>

          {/* <Link href="/SellerContact" onClick={closeMenu}>
            Sell Your Bike
          </Link> */}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="bb-navbar__auth-desktop">
          {userName ? (
            <div className="user-section">
              <button
                className="user-name"
                onClick={() => router.push("/buyer/dashboard")}
              >
                Hello {userName}
              </button>
              <div
                className="profile-icon"
                onClick={() => router.push("/buyer/dashboard")}
              >
                <FiUser />
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bb-btn bb-btn-primary"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>

        {/* Hamburger menu with animation class */}
        <div
          className={`bb-navbar__toggle ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Mobile Navigation Links */}
          <nav className="bb-navbar__links active">
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>

            {/* Mobile Dropdown */}
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              >
                Bikes
                <FaChevronDown
                  style={{
                    fontSize: "14px",
                    transform: mobileDropdownOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",
                  }}
                />
              </button>

              {mobileDropdownOpen && (
                <div className="dropdown-menu">
                  <Link href="/bikes" onClick={closeMenu}>
                    Motorcycles
                  </Link>
                  <Link href="/bikes?category=scooty" onClick={closeMenu}>
                    Scooters
                  </Link>
                </div>
              )}
            </div>
            {/* Buyer Sell bike */}

            {/* <Link href="/SellerContact" onClick={closeMenu}>
              Sell Your Bike
            </Link> */}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="bb-navbar__auth-mobile active">
            <div className="mobile-auth-container">
              {userName ? (
                <>
                  <span className="mobile-user-greeting">
                    👋 Hello {userName}
                  </span>
                  <button
                    className="bb-btn bb-btn-outline"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      localStorage.removeItem("name");
                      setUserName(null);
                      router.push("/");
                      closeMenu();
                    }}
                  >
                    Logout
                  </button>
                  <button
                    className="bb-btn bb-btn-primary"
                    onClick={() => {
                      router.push("/buyer/dashboard");
                      closeMenu();
                    }}
                  >
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="bb-btn bb-btn-outline"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bb-btn bb-btn-primary"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* Location Modal */}
      {locationModalOpen && (
        <div
          className="location-modal-overlay"
          onClick={() => !isLocating && setLocationModalOpen(false)}
        >
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Select your location</h2>
              {!isLocating && (
                <button
                  className="close-btn"
                  onClick={() => setLocationModalOpen(false)}
                >
                  ✕
                </button>
              )}
            </div>

            <button
              className="current-location-btn"
              disabled={isLocating}
              onClick={() => {
                if (!navigator.geolocation) {
                  alert("Geolocation not supported");
                  return;
                }

                setIsLocating(true);

                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                      localStorage.setItem("userLat", latitude);
                      localStorage.setItem("userLng", longitude);
                      localStorage.removeItem("selectedLocation");

                      const res = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDJ7qpCw3pf-zN-fY1DqWZ4HDK0Dmi62C4`,
                      );

                      const data = await res.json();
                      let city = "";
                      let state = "";

                      if (data.results?.length > 0) {
                        const components = data.results[0].address_components;
                        components.forEach((comp) => {
                          if (
                            comp.types.includes("locality") ||
                            comp.types.includes(
                              "administrative_area_level_2",
                            ) ||
                            comp.types.includes("sublocality") ||
                            comp.types.includes("postal_town")
                          ) {
                            if (!city) city = comp.long_name;
                          }
                          if (
                            comp.types.includes("administrative_area_level_1")
                          ) {
                            state = comp.long_name;
                          }
                        });
                      }

                      const locationObj = {
                        id: Date.now(),
                        name:
                          city && state
                            ? `${city}, ${state}`
                            : city || "Current Location",
                      };

                      setSelectedLocation(locationObj);
                      localStorage.setItem(
                        "selectedLocation",
                        JSON.stringify(locationObj),
                      );
                      setIsLocating(false);
                      setLocationModalOpen(false);
                      router.push("/");
                    } catch (err) {
                      console.log(err);
                      setIsLocating(false);
                    }
                  },
                  () => {
                    alert("Unable to get location");
                    setIsLocating(false);
                  },
                );
              }}
            >
              {isLocating ? (
                <span className="loader-text">
                  <span className="loader"></span>
                  Detecting location...
                </span>
              ) : (
                "📍 Use my current location"
              )}
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="Search city or area..."
              value={locationSearch}
              onChange={async (e) => {
                const value = e.target.value;
                setLocationSearch(value);

                if (value.length > 2) {
                  try {
                    const res = await fetch(
                      "https://api.bikesbuyer.com/api/buyer/reverse-geocode",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ address: value }),
                      },
                    );

                    const data = await res.json();

                    if (data.success && (data.city || data.state)) {
                      setSearchResults([
                        {
                          id: Date.now(),
                          name: data.city,
                          img: "https://cdn-icons-png.flaticon.com/512/61/61456.png",
                        },
                      ]);
                    } else {
                      setSearchResults([]);
                    }
                  } catch (err) {
                    setSearchResults([]);
                  }
                } else {
                  setSearchResults([]);
                }
              }}
              disabled={isLocating}
              className="location-search"
            />

            <div className="location-list">
              {(locationSearch.length > 2
                ? searchResults
                : filteredLocations
              ).map((loc) => (
                <div
                  key={loc.id}
                  className="location-row"
                  onClick={() => {
                    // ❌ REMOVE current location
                    localStorage.removeItem("userLat");
                    localStorage.removeItem("userLng");

                    // ✅ SAVE new manual location
                    setSelectedLocation(loc);
                    localStorage.setItem(
                      "selectedLocation",
                      JSON.stringify(loc),
                    );

                    setLocationModalOpen(false);

                    // 🔥 FORCE NEW DATA LOAD
                    window.location.href = `/?city=${encodeURIComponent(loc.name)}`;
                  }}
                >
                  <img src={loc.img} alt={loc.name} />
                  <span>{loc.name}</span>
                </div>
              ))}

              {filteredLocations.length === 0 && !isLocating && (
                <p className="empty-text">No location found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
