// src/api/userApi.js
const BASE_URL = "http://localhost:5000/api/user";

/* ========= SEND OTP ========= */
export const sendOtpApi = async (phone) => {
  const res = await fetch(`${BASE_URL}/buyer/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send OTP");
  }

  return data;
};


/* ========= VERIFY OTP ========= */
export const verifyOtpApi = async (phone, otp) => {
  const res = await fetch(`${BASE_URL}/buyer/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  return data;
};


/* ========= COMPLETE PROFILE ========= */
export const buyerSignupApi = async (data) => {
  const res = await fetch(`${BASE_URL}/buyer/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Signup failed");
  }

  return result;
};



//=========SEND MAIL==================
// export const subscribeNewsletterApi = async (email) => {
//   const res = await fetch("http://localhost:5000/api/buyer/newsletter", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Newsletter subscription failed");
//   }

//   return data;
// };


//=========SUBSCRIBE NEWSLETTER==================
export const subscribeNewsletterApi = async (email) => {
  const res = await fetch("http://localhost:5000/api/buyer/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Newsletter subscription failed");
  }

  return data;
};