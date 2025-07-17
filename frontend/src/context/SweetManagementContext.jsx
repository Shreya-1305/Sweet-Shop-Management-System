import React, { createContext, useContext, useState, useEffect } from "react";
import { useSweet } from "./SweetContext";

const SweetManagementContext = createContext();

export const SweetManagementProvider = ({ children }) => {
  const {
    sweets,
    fetchSweets,
    addSweet,
    updateSweetById,
    deleteSweetById,
    setSearchParams,
    setSortBy,
    setPriceRange,
  } = useSweet();

  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState("");

  const refreshSweets = () => {
    setLoading(true);
    fetchSweets().finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshSweets();
  }, []);

  const applyFilters = () => {
    setSearchParams({ name: searchName, category: searchCategory });
    setPriceRange({ min: minPrice, max: maxPrice });
    setSortBy(sortField);
  };

  const handleAdd = () => {
    setSelectedSweet(null);
    setOpenDialog(true);
  };

  const handleEdit = (sweet) => {
    setSelectedSweet(sweet);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    await deleteSweetById(id);
    refreshSweets();
  };

  const handleSave = async (formData) => {
    if (selectedSweet) {
      await updateSweetById(selectedSweet._id, formData);
    } else {
      await addSweet(formData);
    }
    setOpenDialog(false);
    refreshSweets();
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <SweetManagementContext.Provider
      value={{
        sweets,
        loading,
        openDialog,
        selectedSweet,
        searchName,
        searchCategory,
        minPrice,
        maxPrice,
        sortField,
        setSearchName,
        setSearchCategory,
        setMinPrice,
        setMaxPrice,
        setSortField,
        applyFilters,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSave,
        closeDialog,
      }}
    >
      {children}
    </SweetManagementContext.Provider>
  );
};

export const useSweetManagement = () => useContext(SweetManagementContext);
