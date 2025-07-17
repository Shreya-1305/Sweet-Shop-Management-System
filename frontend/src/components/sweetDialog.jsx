import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

const categories = [
  "chocolate",
  "candy",
  "pastry",
  "milk-based",
  "nut-based",
  "vegetable-based",
];

const formatCategory = (category) => {
  return category
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SweetDialog = ({ open, onClose, onSave, selectedSweet }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedSweet) {
      setFormData(selectedSweet);
    } else {
      setFormData({ name: "", category: "", price: "", quantity: "" });
    }
  }, [selectedSweet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || Number(formData.price) < 0)
      newErrors.price = "Valid price is required";
    if (!formData.quantity || Number(formData.quantity) < 0)
      newErrors.quantity = "Valid quantity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", color: "#614419" }}>
        {selectedSweet ? "Edit Sweet" : "Add New Sweet"}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="name"
            label="Sweet Name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            name="category"
            label="Category"
            select
            value={formData.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {formatCategory(cat)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            fullWidth
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            error={!!errors.quantity}
            helperText={errors.quantity}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "red" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: "#DB9A39", color: "white" }}
        >
          {selectedSweet ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SweetDialog;
