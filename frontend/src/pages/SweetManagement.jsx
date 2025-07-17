import React, { useState, useEffect } from "react";
import { useSweetManagement } from "../context/SweetManagementContext";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SweetDialog from "../components/SweetDialog";

const formatCategory = (category) => {
  return category
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SweetManagement = () => {
  const {
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
  } = useSweetManagement();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      renderCell: (params) => params.value.slice(0, 4),
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => formatCategory(params.value),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row._id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-[#FFF7E0] py-5 px-4 sm:px-10">
      <Box sx={{ minHeight: "100vh", backgroundColor: "#fff", px: 4, py: 2 }}>
        {/* Message Box */}
        <Box className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md mb-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#614419] mb-2 text-center">
            Inventory Management
          </h2>
          <p className="text-center text-[#7A5B2B]">
            Manage your sweet stock efficiently. Add, edit, or remove items and
            keep your store updated.
          </p>
        </Box>

        {/* Filter Controls */}
        <Box
          className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md mb-6 flex flex-wrap items-center justify-center gap-4"
          sx={{ mb: 1 }}
        >
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <TextField
            label="Search by Category"
            variant="outlined"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          />
          <TextField
            label="Min Price"
            type="number"
            variant="outlined"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <TextField
            label="Max Price"
            type="number"
            variant="outlined"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <TextField
            select
            label="Sort By"
            variant="outlined"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </TextField>
          <Button
            onClick={applyFilters}
            sx={{ backgroundColor: "#DB9A39", color: "white", height: "45px" }}
            variant="contained"
          >
            Apply Filters
          </Button>
        </Box>

        <Box display="flex" justifyContent="flex-start" mb={1}>
          <Button
            variant="contained"
            onClick={handleAdd}
            sx={{ backgroundColor: "#DB9A39", color: "white", height: "45px" }}
          >
            Add Sweet
          </Button>
        </Box>

        <Paper
          elevation={3}
          sx={{ backgroundColor: "#FFF7E8", borderRadius: 2, p: 2 }}
        >
          <DataGrid
            rows={sweets}
            getRowId={(row) => row._id}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            sx={{
              border: "1px solid #DB9A39",
              width: "100%",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#FFE0B2",
                color: "#5D3A00",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: "#FFF7E8",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#FFE0B2",
              },
            }}
            loading={loading}
          />
        </Paper>

        <SweetDialog
          open={openDialog}
          onClose={closeDialog}
          onSave={handleSave}
          selectedSweet={selectedSweet}
        />
      </Box>
    </div>
  );
};

export default SweetManagement;
