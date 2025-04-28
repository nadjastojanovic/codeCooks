"use client";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const tag_options = ["Breakfast", "Lunch", "Dinner", "Dessert", "Drinks"];

export default function AddRecipeModal({ onClose }) {
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    ingredients: [""],
    steps: [""],
    tags: [],
  });

  const ingredientRefs = useRef([]);
  const stepRefs = useRef([]);

  const isFormValid = () =>
    formData.title.trim() &&
    formData.image_url.trim() &&
    formData.ingredients.every((i) => i.trim()) &&
    formData.steps.every((s) => s.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, type) => {
    const updated = [...formData[type]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  const addField = (type) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));

    setTimeout(() => {
      if (type === "ingredients" && ingredientRefs.current.length) {
        ingredientRefs.current[ingredientRefs.current.length - 1]?.focus();
      }
      if (type === "steps" && stepRefs.current.length) {
        stepRefs.current[stepRefs.current.length - 1]?.focus();
      }
    }, 100); // slight delay for DOM update
  };

  const removeField = (index, type) => {
    const updated = [...formData[type]];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [type]: updated.length ? updated : [""],
    }));
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    const payload = {
      ...formData,
      ingredients: formData.ingredients.filter((i) => i.trim()),
      steps: formData.steps.filter((s) => s.trim()),
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        onClose();
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-xl font-semibold">Add a Recipe</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {showAlert && (
            <Alert severity="warning">
              Please fill out all required fields.
            </Alert>
          )}
          <TextField
            name="title"
            label="Title*"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description (optional)"
            multiline
            rows={2}
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="image_url"
            label="Image URL*"
            value={formData.image_url}
            onChange={handleChange}
            fullWidth
          />

          {/* Ingredients */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Ingredients*</h3>
              <IconButton size="small" onClick={() => addField("ingredients")}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </div>
            {formData.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-1">
                <TextField
                  inputRef={(el) => (ingredientRefs.current[idx] = el)}
                  value={ing}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "ingredients")
                  }
                  placeholder={`Ingredient ${idx + 1}`}
                  fullWidth
                  size="small"
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeField(idx, "ingredients")}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Steps*</h3>
              <IconButton size="small" onClick={() => addField("steps")}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </div>
            {formData.steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-1">
                <TextField
                  inputRef={(el) => (stepRefs.current[idx] = el)}
                  value={step}
                  onChange={(e) =>
                    handleArrayChange(idx, e.target.value, "steps")
                  }
                  placeholder={`Step ${idx + 1}`}
                  fullWidth
                  size="small"
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => removeField(idx, "steps")}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">
              Select Tags:
            </div>
            <FormGroup row>
              {tag_options.map((tag) => (
                <FormControlLabel
                  key={tag}
                  control={
                    <Checkbox
                      checked={formData.tags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                    />
                  }
                  label={tag}
                />
              ))}
            </FormGroup>
          </div>
        </Stack>
      </DialogContent>
      <DialogActions className="px-6 pb-4">
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
