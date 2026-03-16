

// src/app/layout.jsx
import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";

export const metadata = {
  title: "BikeBuyer",
  description: "Buy and Sell Bikes Easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN (optional if already imported above) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <body>
        <Navbar />
        {children}
        <Footer />

        {/* ✅ Google Maps Script for Places */}
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJ7qpCw3pf-zN-fY1DqWZ4HDK0Dmi62C4&libraries=places"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
