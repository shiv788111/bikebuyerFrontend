"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpApi, sendOtpApi } from "../../api/userApi";
import "@/styles/OtpPage.css";

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phone = searchParams.get("phone");
  const redirect = searchParams.get("redirect");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [expired, setExpired] = useState(false);
  const [resending, setResending] = useState(false);
  const [devOtp, setDevOtp] = useState(searchParams.get("devOtp"));

  // ⏳ Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    try {
      setResending(true);

      const data = await sendOtpApi(phone);

      setDevOtp(data.otp); // 🔥 IMPORTANT LINE
      setTimeLeft(30);
      setExpired(false);
      setOtp("");
    } catch (err) {
      alert(err.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!phone) {
      alert("Phone number missing");
      return;
    }

    if (expired) {
      alert("OTP expired. Please resend.");
      return;
    }

    if (otp.length !== 4) {
      alert("Enter 4 digit OTP");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyOtpApi(phone, otp);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name || "");
      window.dispatchEvent(new Event("userLogin"));

      // 🔥 MAIN LOGIC
      if (!data.isProfileComplete) {
        router.push(`/auth/register?phone=${phone}`);
        return;
      }

      if (redirect) {
        router.push(decodeURIComponent(redirect));
      } else {
        router.push("/buyer/dashboard");
      }
    } catch (err) {
      alert(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-wrapper">
      {/* 🔥 Right Side OTP Popup */}
      {devOtp && (
        <div className="otp-dev-popup">
          <p className="otp-dev-title">Please use this OTP</p>
          <h3 className="otp-dev-code">{devOtp}</h3>
        </div>
      )}

      <form className="otp-card" onSubmit={handleVerifyOtp}>
        <h2>Verify OTP</h2>
        <p>Enter the 4-digit code sent to +91 {phone}</p>

        <input
          className="otp-input"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={4}
          placeholder="• • • •"
          disabled={expired}
        />

        {!expired ? (
          <div className="otp-timer">
            Expires in <span>{timeLeft}s</span>
          </div>
        ) : (
          <div className="otp-expired"></div>
        )}

        <button
          className="verify-btn"
          type="submit"
          disabled={loading || expired}
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>

        {expired && (
          <button
            type="button"
            className="resend-btn"
            onClick={handleResendOtp}
            disabled={resending}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </form>
    </div>
  );
}
