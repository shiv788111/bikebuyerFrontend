"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "@/styles/sellerRegister.css";

export default function SellerLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Seller Login:", form);
    router.push("/seller/dashboard");
  };

  return (
    <div className="sell-register-wrapper">
      <form className="sell-register-card" onSubmit={handleLogin}>

        {/* HEADER (same as register) */}
        <div className="sell-register-header">
          <h2>Seller Login</h2>
          <p>Login to manage your bikes on BikeBuyer</p>
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* BUTTON (same class) */}
        <button type="submit" className="register-btn">
          Login
        </button>

        {/* FOOTER */}
        <div className="sell-register-footer">
          Don’t have an account? <Link href="/SellerContact">Register</Link>
        </div>

      </form>
    </div>
  );
}
