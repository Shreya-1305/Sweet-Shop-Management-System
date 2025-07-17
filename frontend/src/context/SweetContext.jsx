import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "./NotificationContext";

const SweetContext = createContext();

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [searchParams, setSearchParams] = useState({ name: "", category: "" });
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [quantities, setQuantities] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { showNotification } = useNotification();

  const API_BASE = "http://localhost:3000/api";

  const fetchSweets = async () => {
    try {
      let query = "";

      if (searchParams.name) query += `&name=${searchParams.name}`;
      if (searchParams.category) query += `&category=${searchParams.category}`;
      if (priceRange.min) query += `&minPrice=${priceRange.min}`;
      if (priceRange.max) query += `&maxPrice=${priceRange.max}`;

      const res = await axios.get(
        `${API_BASE}/sweets/search?${query.substring(1)}`
      );
      let sweetsData = res.data.data;

      if (sortBy) {
        const sortRes = await axios.get(
          `${API_BASE}/sweets/sort?sort=${sortBy}`
        );
        sweetsData = sortRes.data.data;
      }

      setSweets(sweetsData);
      setFilteredSweets(sweetsData);

      const initialQuantities = {};
      sweetsData.forEach((sweet) => {
        initialQuantities[sweet._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (err) {
      console.error("Failed to fetch sweets:", err);
    }
  };

  const refreshSweets = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handlePurchase = async (sweetId) => {
    try {
      const quantity = quantities[sweetId];
      await axios.patch(`${API_BASE}/inventory/${sweetId}/purchase`, {
        quantity,
      });
      showNotification("Purchase successful!", "success");
      refreshSweets();
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Purchase failed",
        "error"
      );
    }
  };

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const addSweet = async (sweetData) => {
    try {
      const res = await axios.post(`${API_BASE}/sweets`, sweetData);
      refreshSweets();
      showNotification("Sweet added successfully!", "success");
      return res.data;
    } catch (err) {
      showNotification("Failed to add sweet.", "error");
      throw err;
    }
  };

  const updateSweetById = async (id, updatedData) => {
    try {
      const res = await axios.patch(`${API_BASE}/sweets/${id}`, updatedData);
      refreshSweets();
      showNotification("Sweet updated successfully!", "info");
      return res.data;
    } catch (err) {
      showNotification("Failed to update sweet.", "error");
      throw err;
    }
  };

  const deleteSweetById = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE}/sweets/${id}`);
      refreshSweets();
      showNotification("Sweet deleted!", "warning");
      return res.data;
    } catch (err) {
      showNotification("Failed to delete sweet.", "error");
      throw err;
    }
  };

  useEffect(() => {
    fetchSweets();
  }, [searchParams, sortBy, priceRange, refreshTrigger]);

  return (
    <SweetContext.Provider
      value={{
        sweets: filteredSweets,
        quantities,
        updateQuantity,
        handlePurchase,
        setSearchParams,
        setSortBy,
        setPriceRange,
        refreshSweets,
        fetchSweets,
        addSweet,
        updateSweetById,
        deleteSweetById,
      }}
    >
      {children}
    </SweetContext.Provider>
  );
};

export const useSweet = () => useContext(SweetContext);
