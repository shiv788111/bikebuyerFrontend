"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buyerSignupApi } from "../../api/userApi";
import "@/styles/registerpage.css";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneFromUrl = searchParams.get("phone");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (phoneFromUrl) {
      setForm((prev) => ({
        ...prev,
        phone: phoneFromUrl,
      }));
    }
  }, [phoneFromUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.city) {
      alert("Name and City are required");
      return;
    }

    try {
      setLoading(true);

      const res = await buyerSignupApi(form);

     if (res.success) {
  alert("Profile completed successfully ");

  //  Name save karo
  localStorage.setItem("name", form.name);

  //  Navbar ko update karne ke liye event bhejo
  window.dispatchEvent(new Event("userLogin"));

 router.push("/");
}
 else {
        alert(res.message || "Signup failed");
      }
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Complete Your Profile</h2>
        <p className="register-subtitle">Fill your details</p>

        {/* NAME */}
        <div className="register-input-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="register-input-group">
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* PHONE (Auto filled & disabled) */}
        {/* <div className="register-input-group">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            disabled
          />
        </div> */}

        {/* CITY */}
        <div className="register-input-group">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />
        </div>

        <button className="register-btn" disabled={loading}>
          {loading ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
}
