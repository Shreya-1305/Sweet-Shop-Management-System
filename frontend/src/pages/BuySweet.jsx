// BuySweet.jsx
import { useSweet } from "../context/SweetContext";
import { useState } from "react";

const BuySweet = () => {
  const {
    sweets,
    quantities,
    updateQuantity,
    handlePurchase,
    setSearchParams,
    setSortBy,
    setPriceRange,
  } = useSweet();

  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState("");

  const applyFilters = () => {
    setSearchParams({ name: searchName, category: searchCategory });
    setPriceRange({ min: minPrice, max: maxPrice });
    setSortBy(sortField);
  };
  const formatCategory = (category) => {
    return category
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-screen min-h-screen bg-[#FFF7E0] py-10 px-4 sm:px-10">
      {/* Message Box */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#614419] mb-2 text-center">
          Welcome to Sweet Shop!
        </h2>
        <p className="text-center text-[#7A5B2B]">
          Treat yourself or your loved ones with delightful sweets. Choose your
          favorite, adjust the quantity, and indulge in a bite of happiness.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md mb-8 flex flex-wrap items-center justify-center gap-4 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search by name"
          className="bg-[#FFF1C1]/80 backdrop-blur-md px-3 py-2 rounded shadow-inner placeholder:text-[#B57E1F] text-[#5D3A00] focus:outline-none"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by category"
          className="bg-[#FFF1C1]/80 backdrop-blur-md px-3 py-2 rounded shadow-inner placeholder:text-[#B57E1F] text-[#5D3A00] focus:outline-none"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="bg-[#FFF1C1]/80 backdrop-blur-md px-3 py-2 rounded shadow-inner placeholder:text-[#B57E1F] text-[#5D3A00] focus:outline-none"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="bg-[#FFF1C1]/80 backdrop-blur-md px-3 py-2 rounded shadow-inner placeholder:text-[#B57E1F] text-[#5D3A00] focus:outline-none"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          className="bg-[#FFF1C1]/80 backdrop-blur-md px-3 py-2 rounded shadow-inner text-[#5D3A00] focus:outline-none"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="price">Price</option>
        </select>
        <button
          onClick={applyFilters}
          className="bg-[#DB9A39] text-white px-4 py-2 rounded hover:bg-[#FFB343] transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Sweets Grid */}
      <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {sweet.imageUrl && (
              <img
                src={sweet.imageUrl}
                alt={sweet.name}
                className="h-32 w-32 object-cover rounded-full mb-3 border-2 border-[#DB9A39]"
              />
            )}
            <h3 className="text-xl font-semibold text-[#614419]">
              {sweet.name}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              {formatCategory(sweet.category)}
            </p>
            <p className="text-[#DB9A39] font-bold mb-2">₹{sweet.price}</p>

            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => updateQuantity(sweet._id, -1)}
                className="bg-[#FFB343] px-2 py-1 rounded text-white text-lg font-bold"
              >
                −
              </button>
              <span className="text-lg font-semibold text-[#614419]">
                {quantities[sweet._id] || 1}
              </span>
              <button
                onClick={() => updateQuantity(sweet._id, 1)}
                className="bg-[#FFB343] px-2 py-1 rounded text-white text-lg font-bold"
              >
                ＋
              </button>
            </div>

            <button
              onClick={() => handlePurchase(sweet._id)}
              className="bg-[#614419] text-white px-4 py-2 rounded hover:bg-[#DB9A39] hover:text-[#614419] transition"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuySweet;
