import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

/*==============GET TOTAL VEHICLE=====================*/

export const getBuyerVehicles = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/buyer/vehicles`);
    return res.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

/* ===== GET SINGLE VEHICLE BY ID ===== */
export const getBuyerVehicleById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/buyer/vehicles/${id}`);
  return res.data;
};

/* ================= SCOOTY LIST ================= */
export const getScootyVehicles = async () => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/buyer/vehicles?category=scooty`,
    );
    return res.data; // { success, vehicles, totalVehicles }
  } catch (error) {
    console.error("Scooty API error:", error);
    throw error;
  }
};

/* ================= BIKE LIST ================= */
export const getBikeVehicles = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/buyer/vehicles?category=bike`);
    return res.data;
  } catch (error) {
    console.error("Bike API error:", error);
    throw error;
  }
};

/* ================= GET ALL BRANDS (BUYER) ================= */
export const getAllBrands = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/admin/getBrands`);
    return res.data.brands; // backend: { success, brands }
  } catch (error) {
    console.error("Brand API error:", error);
    return [];
  }
};

/*============== FILTER VEHICLES  WITH BRAND NAME=====================*/
export const getFilteredVehicles = async (filters = {}) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/buyer/vehicles`, {
      params: filters, // 👈 ye query string banayega
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching filtered vehicles:", error);
    throw error;
  }
};

/* ================= SEND  REQUEST  BIKE FOR BIKE================= */
export const requestBikeApi = async (vehicleId, message) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API_BASE_URL}/buyer/requestBike`,
      {
        vehicleId,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error("Request Bike API error:", error);
    throw error.response?.data || error;
  }
};

/* ================= GET VEHICLES BY SUB CATEGORY ================= */
export const getVehiclesBySubCategory = async (subCategoryName) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/buyer/vehicles`, {
      params: {
        subCategoryName,
      },
    });

    return res.data;
  } catch (error) {
    console.error("SubCategory API error:", error);
    throw error;
  }
};

/*===================GET SIMILAR BIKE===========*/
export const getSimilarVehicles = async (vehicleId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/buyer/vehicles/${vehicleId}/similar`,
    );

    return await res.json();
  } catch (error) {
    console.error("Similar vehicles error:", error);
    return { vehicles: [] };
  }
};





/* ================= GET NEARBY BIKES ================= */
export const getNearbyBikes = async (lat, lng) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/buyer/nearby-bikes`,
      {
        params: { lat, lng },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Nearby bikes error:", error);
    throw error;
  }
};