"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import "@/styles/bikeDetail.css";
import { getBuyerVehicleById, requestBikeApi } from "@/app/api/vehicleApi";
import SimilarBikes from "@/components/bikes/SimilarBikes";

export default function BikeDetailPage() {
  const { bikeId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // success | error
  });

  /* ================= LOGIN CHECK ================= */
  const handleEnquiryClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(
        `/auth/login?redirect=${encodeURIComponent(
          `/bikes/${bikeId}?openEnquiry=true`,
        )}`,
      );
      return;
    }

    setIsModalOpen(true);
  };

  useEffect(() => {
    const openEnquiry = searchParams.get("openEnquiry");
    const token = localStorage.getItem("token");

    if (openEnquiry === "true" && token) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  //   e.preventDefault();

  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     router.push(
  //       `/auth/login?redirect=${encodeURIComponent(
  //         `/bikes/${bikeId}?openEnquiry=true`,
  //       )}`,
  //     );
  //     return;
  //   }

  //   try {
  //     const res = await requestBikeApi(bikeId, formData.message);

  //     alert(res.message);
  //     setIsModalOpen(false);
  //     setFormData({ name: "", mobile: "", message: "" });
  //   } catch (err) {
  //     alert(err.message || "Something went wrong");
  //   }
  // };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      router.push(
        `/auth/login?redirect=${encodeURIComponent(
          `/bikes/${bikeId}?openEnquiry=true`,
        )}`,
      );
      return;
    }

    try {
      const res = await requestBikeApi(bikeId, formData.message);

      // ✅ YAHAN ADD KARNA THA
      setToast({
        show: true,
        message: res.message || "Enquiry sent successfully!",
        type: "success",
      });

      setIsModalOpen(false);
      setFormData({ name: "", mobile: "", message: "" });
    } catch (err) {
      setToast({
        show: true,
        message: err.message || "Something went wrong",
        type: "error",
      });
    }

    // auto hide after 3 sec
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  /* ================= FETCH BIKE ================= */
  useEffect(() => {
    if (!bikeId) return;

    const fetchBike = async () => {
      try {
        const data = await getBuyerVehicleById(bikeId);
        if (data?.success) setBike(data.vehicle);
        else setBike(null);
      } catch (err) {
        console.error(err);
        setBike(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [bikeId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!bike) return <p style={{ textAlign: "center" }}>Bike not found</p>;

  const images = bike.images?.map((img) => img.imageUrl) || [];

  return (
    <>
      <div className="bike-detail-modern-page">
        <div className="bike-card-modern">
          {/* ================= LEFT SIDE ================= */}
          <div className="bike-left">
            {/* IMAGE */}
            <div className="bike-image-modern">
              <img
                src={images[currentSlide] || "/no-image.png"}
                className="main-bike-img"
                alt={bike.model}
              />
              {/* THUMBNAILS */}
              {/* {images.length > 1 && (
                <div className="thumbnail-row">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="thumb"
                      className={`thumb-img ${
                        currentSlide === index ? "active-thumb" : ""
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              )} */}

              {images.length > 1 && (
                <>
                  <button
                    className="slider-btn prev"
                    onClick={() =>
                      setCurrentSlide(
                        currentSlide === 0
                          ? images.length - 1
                          : currentSlide - 1,
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className="slider-btn next"
                    onClick={() =>
                      setCurrentSlide(
                        currentSlide === images.length - 1
                          ? 0
                          : currentSlide + 1,
                      )
                    }
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* BIKE DETAILS */}
            <div className="bike-details-modern">
              <h1>
                {bike.brand} {bike.model}
              </h1>
              <h2>₹{bike.price.toLocaleString()}</h2>
              <h3>About</h3>
              <p className="bike-desc">{bike.description}</p>

              <div className="bike-specs-modern">
                <div>
                  <strong>Registration Year:</strong> {bike.year}
                </div>
                <div>
                  <strong>KM Driven:</strong> {bike.kmDriven.toLocaleString()}{" "}
                  km
                </div>
                <div>
                  <strong>Condition:</strong> {bike.condition}
                </div>
                <div>
                  <strong>Engine:</strong>{" "}
                  {bike.engineCC ? `${bike.engineCC} cc` : "N/A"}
                </div>
                <div>
                  <strong>Mileage:</strong>{" "}
                  {bike.mileage ? `${bike.mileage} km/l` : "N/A"}
                </div>
                <div>
                  <strong>Owners:</strong> {bike.numberOfOwners || "N/A"}
                </div>
                <div>
                  <strong>Registration No:</strong>{" "}
                  {bike.registrationNumber || "N/A"}
                </div>
              </div>
              <button className="back-btn" onClick={() => router.push("/")}>
                ← Back to Home
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE (SELLER) ================= */}
          <div className="bike-right">
            <div className="dealer-card">
              <div className="dealer-left">
                <div className="dealer-avatar">🏍️</div>

                <div className="dealer-info">
                  <h4>{bike.agency.shopName}</h4>
                  <p>
                    {bike.agency.city}, {bike.agency.state}
                  </p>
                  <p>
                    <strong>Seller:</strong> {bike.agency.user.name}
                  </p>
                  <p className="dealer-email">{bike.agency.user.email}</p>
                  <span className="verified-badge">✔ Verified Dealer</span>
                </div>
              </div>

              <div className="dealer-actions">
                <button
                  className="dealer-enquiry-btn"
                  onClick={handleEnquiryClick}
                >
                  📩 Send Enquiry
                </button>

                <a
                  href={`https://wa.me/91${bike.agency?.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dealer-whatsapp-btn"
                >
                  <span className="default-text"> WhatsApp</span>
                  <span className="hover-text">+91 {bike.agency?.phone}</span>
                </a>

                {/* <a
  href={`https://wa.me/91${bike.agency?.phone}`}
  target="_blank"
  rel="noopener noreferrer"
  className="dealer-whatsapp-btn"
  title={`+91 ${bike.agency?.phone}`}  // 👈 Hover pe number show hoga
>
  💬 WhatsApp
</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===== Similar Bikes Section ===== */}
      <SimilarBikes bikeId={bikeId} />

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div
          className="enquiry-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="enquiry-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="enquiry-modal-header">
              <h2>Contact the seller</h2>
              <p className="enquiry-modal-subtext">
                Send a quick message to the seller about this bike.
              </p>
            </div>

            <form onSubmit={handleSubmitEnquiry}>
              <textarea
                placeholder="Please enter your message..."
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <button type="submit">Send Message</button>
            </form>

            <button
              className="enquiry-modal-close-btn"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`custom-toast ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✔" : "⚠"}
          </span>
          {toast.message}
        </div>
      )}
    </>
  );
}
