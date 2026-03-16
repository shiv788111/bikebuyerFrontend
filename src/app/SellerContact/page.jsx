  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import Link from "next/link";
  import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
  import "@/styles/sellerRegister.css";

  export default function SellBikeRegister() {
    const router = useRouter();

    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = (e) => {
      e.preventDefault();
      console.log("Seller Registered:", form);
      router.push("/auth/login");
    };

    return (
      <div className="sell-register-wrapper">
        <form className="sell-register-card" onSubmit={handleRegister}>
          
          <div className="sell-register-header">
            <h2>Create Seller Account</h2>
            <p>Start selling bikes on BikeBuyer</p>
          </div>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Create Password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

          <div className="sell-register-footer">
            Already a seller? <Link href="/SellerLogin">Login</Link>
          </div>
        </form>
      </div>
    );
  }
