"use client";

import { useState, useRef } from "react";

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
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion"; // animations (new library)

// these are pre-set, would be nice to allow users to add custom ones
const tag_options = ["Breakfast", "Lunch", "Dinner", "Dessert", "Drinks"];

export default function AddRecipeModal({ onClose, onRecipeAdded }) {
  const [showAlert, setShowAlert] = useState(false); // this is if they leave out any of the required fields in the form
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

  const isFormValid = () => { // check that all required fields are filled
    formData.title.trim() &&
    formData.ingredients.filter(Boolean).length &&
    formData.steps.filter(Boolean).length &&
    formData.image_url.trim();
  }

  const handleChange = (e) => { // update form data as they type
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* -- ADDING AND REMOVING INGREDIENTS AND STEPS -- */

  const handleIngredientChange = (index, value) => {
    const updated = [...formData.ingredients];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleStepChange = (index, value) => {
    const updated = [...formData.steps];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, steps: updated }));
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
    setTimeout(() => {
      const lastInput = ingredientRefs.current[ingredientRefs.current.length - 1];
      if (lastInput) {
        lastInput.focus();
      }
    }, 0);
  };

  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }));
    setTimeout(() => {
      const lastInput = stepRefs.current[stepRefs.current.length - 1];
      if (lastInput) lastInput.focus();
    }, 0);
  };

  const handleDeleteIngredient = (index) => {
    const updated = [...formData.ingredients];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const handleDeleteStep = (index) => {
    const updated = [...formData.steps];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, steps: updated }));
  };

  // firs tcheck if all required fields are complete
  const handleSubmit = async () => {
    if (!isFormValid()) {
      setShowAlert(true); // alert !
      return;
    }

    setShowAlert(false);

    const payload = {
      ...formData,
      ingredients: formData.ingredients.filter(Boolean),
      steps: formData.steps.filter(Boolean),
    };

    try { // post the form data
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onRecipeAdded();
        onClose();
      } else {
        console.error("Error submitting recipe");
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };

  // update selected tags on the fly
  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <>
      <Dialog open onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle className="text-xl font-semibold">
          Add a Recipe
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {showAlert && (
              <Alert severity="warning"> {/* to show if they attempt to submit before filling in all required fields */}
                Please fill out all required fields.
              </Alert>
            )}
            {/* FORM DATA */}
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
            {/* also would be nice to allow them to upload image instead of just URL */}
            <TextField 
              name="image_url"
              label="Image URL*"
              value={formData.image_url}
              onChange={handleChange}
              fullWidth
            />

            {/* INGREDIENTS */}
            <Stack spacing={1}>
              <div className="flex justify-between items-center">
                <h2 className="text-md font-medium">Ingredients*</h2>
                <Button onClick={handleAddIngredient} size="small">
                  + Add Ingredient
                </Button>
              </div>
              {formData.ingredients.map((ingredient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-2 items-center">
                    <TextField
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      fullWidth
                      placeholder={`Ingredient ${index + 1}`}
                      inputRef={(el) => (ingredientRefs.current[index] = el)}
                    />
                    <IconButton
                      onClick={() => handleDeleteIngredient(index)}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                </motion.div>
              ))}
            </Stack>

            {/* STEPS */}
            <Stack spacing={1}>
              <div className="flex justify-between items-center">
                <h2 className="text-md font-medium">Steps*</h2>
                <Button onClick={handleAddStep} size="small">
                  + Add Step
                </Button>
              </div>
              {formData.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-2 items-center">
                    <TextField
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      fullWidth
                      placeholder={`Step ${index + 1}`}
                      inputRef={(el) => (stepRefs.current[index] = el)}
                    />
                    <IconButton
                      onClick={() => handleDeleteStep(index)}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                </motion.div>
              ))}
            </Stack>

            {/* TAGS */}
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
          {/* on close, animation should not appear */}
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          {/* on submit, animation should appear */}
          <Button onClick={handleSubmit} variant="contained">
            Submit 
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
