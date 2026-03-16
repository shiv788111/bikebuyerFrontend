"use client";


import { ChevronLeft, ChevronRight } from "lucide-react";
import "@/styles/recentlyViewed.css";
import { useRef, useEffect } from "react";


const recentItems = [
  {
    id: 1,
    name: "Honda Activa 6G",
    price: "₹75,433",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjUWfj984igpEB1PxzqD6pxGidH7Go4DPpXPbLATXV5j7sWdhxgSEsFwK3BQ6tl2T_JpdpvMKPQhB_yQQmufya7vEVtj1L6XBuYVyYStMosqS4IxtMYDAgP3WhbvQSx4Tzvyj2FbUQ6ZA/s1600/race-bike-wallpaper-87766.jpg",
  },
  {
    id: 2,
    name: "Suzuki Access 125",
    price: "₹77,684",
    image: "https://www.evoindia.com/h-upload/2025/09/06/463737-updated-apache-rtr-200-4v-cover.webp",
  },
  {
    id: 3,
    name: "TVS NTORQ 125",
    price: "₹80,900",
    image: "https://i.pinimg.com/736x/4f/bc/80/4fbc8094199eaf4881820ddf7a24323c.jpg",
  },
  {
    id: 4,
    name: "Yamaha RayZR 125",
    price: "₹74,300",
    image: "https://wallpapers.com/images/featured/hero-bike-429ltntbvmkixcrr.jpg",
  },
    {
    id: 5,
    name: "Honda Activa 6G",
    price: "₹75,433",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjUWfj984igpEB1PxzqD6pxGidH7Go4DPpXPbLATXV5j7sWdhxgSEsFwK3BQ6tl2T_JpdpvMKPQhB_yQQmufya7vEVtj1L6XBuYVyYStMosqS4IxtMYDAgP3WhbvQSx4Tzvyj2FbUQ6ZA/s1600/race-bike-wallpaper-87766.jpg",
  },
  {
    id: 6,
    name: "Suzuki Access 125",
    price: "₹77,684",
    image: "https://www.evoindia.com/h-upload/2025/09/06/463737-updated-apache-rtr-200-4v-cover.webp",
  },
];

export default function RecentlyViewed() {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    intervalRef.current = setInterval(() => {
      container.scrollBy({
        left: 1,
        behavior: "auto",
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }
    }, 15);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    stopAutoScroll(); // 👈 click par rukega

    const scrollAmount = 260;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="recent-wrapper">
      <div className="recent-header">
        <div>
          <h2>Recently Viewed</h2>
          <span className="recent-subtitle">
            Based on your browsing history
          </span>
        </div>

        <div className="recent-arrows">
          <button onClick={() => scroll("left")} className="arrow-btn">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll("right")} className="arrow-btn">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        className="recent-scroll"
        ref={scrollRef}
        onMouseEnter={stopAutoScroll}   // 👈 hover par rukega
        onMouseLeave={startAutoScroll}  // 👈 cursor hatate hi chalega
      >
        {[...recentItems, ...recentItems].map((item, index) => (
          <div
            className="recent-card"
            key={index}
            onClick={stopAutoScroll}  // 👈 card click par bhi rukega
          >
            <div className="recent-img">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="recent-info">
              <h4>{item.name}</h4>
              <p className="recent-price">{item.price}</p>
              <button className="recent-btn">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


