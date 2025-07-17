import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SweetContext = createContext();

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [searchParams, setSearchParams] = useState({ name: "", category: "" });
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [quantities, setQuantities] = useState({});

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

  const handlePurchase = async (sweetId) => {
    try {
      const quantity = quantities[sweetId];
      await axios.patch(`${API_BASE}/inventory/${sweetId}/purchase`, {
        quantity,
      });
      alert("Purchase successful");
      fetchSweets(); // Refresh after purchase
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  const updateQuantity = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  useEffect(() => {
    fetchSweets();
  }, [searchParams, sortBy, priceRange]);

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
      }}
    >
      {children}
    </SweetContext.Provider>
  );
};

export const useSweet = () => useContext(SweetContext);
