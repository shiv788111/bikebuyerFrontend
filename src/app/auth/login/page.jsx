"use client";
import "@/styles/loginpage.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Shield } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { sendOtpApi } from "@/app/api/userApi";

export default function LoginPage() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      alert("Please enter valid mobile number");
      return;
    }

    try {
      setIsLoading(true);

      const data = await sendOtpApi(mobile);
      console.log("OTP API Response:", data);

      const redirect = searchParams.get("redirect");

      router.push(
        `/auth/otp?phone=${mobile}&devOtp=${data.otp}${
          redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""
        }`,
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Login Card */}
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-logo-container">
              <div className="login-logo">
                <Shield className="logo-icon" />
              </div>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">
              Sign in with your mobile number to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Input Group */}
            <div className="input-group">
              <label className="input-label">Mobile Number</label>
              <div className="input-wrapper">
                <div className="country-code-wrapper">
                  <span className="country-code">+91</span>
                  <div className="separator"></div>
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  maxLength={10}
                  placeholder="98765 43210"
                  className="mobile-input"
                  required
                />
              </div>
              <p className="input-hint">We'll send you a verification code</p>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isLoading || mobile.length !== 10}
              className="continue-btn"
            >
              {isLoading ? (
                <span className="loading-container">
                  <svg
                    className="spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="spinner-circle"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="spinner-path"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="btn-content">
                  Continue
                  <ArrowRight className="btn-icon" />
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="divider-container">
              <div className="divider-line"></div>
              <div className="divider-text">New to our platform?</div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="footer-container">
          <p className="footer-text">
            By continuing, you agree to our{" "}
            <button className="footer-link">Terms</button> and{" "}
            <button className="footer-link">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
}
