// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import "@/styles/popularBikes.css";
// import { getBikeVehicles } from "@/app/api/vehicleApi";

// export default function PopularBikes() {
//   const [bikes, setBikes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBikes();
//   }, []);

//   const fetchBikes = async () => {
//     try {
//       const data = await getBikeVehicles();
//       if (data?.success) {
//         setBikes(data.vehicles || []);
//       }
//     } catch (err) {
//       console.error("Bike fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p style={{ textAlign: "center" }}>Loading bikes...</p>;
//   }

//   if (bikes.length === 0) {
//     return <p style={{ textAlign: "center" }}>No bikes found</p>;
//   }

//   return (
//     <div className="popular-bikes-container">
//       <h2>Popular Bikes</h2>

//       <div className="popular-bikes-grid">
//         {bikes.map((bike) => (
//           <div key={bike.vehicleId} className="bike-card">
//             <div className="bike-image">
//               <img
//                 src={bike.images?.[0]?.imageUrl || "/placeholder-bike.png"}
//                 alt={`${bike.brand?.name} ${bike.model}`}
//               />
//             </div>

//             <div className="bike-info">
//               <h3>
//                 {bike.brand?.name} {bike.model}
//               </h3>

//               <p className="bike-price">₹{bike.price?.toLocaleString()}</p>

//               <Link href={`/bikes/${bike.vehicleId}`}>
//                 <button className="view-btn">View Details</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
