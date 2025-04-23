"use client";
import { useState } from "react";
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
} from "@mui/material";

// optionally, they can choose 1 or more from the below tags
const tag_options = ["Breakfast", "Lunch", "Dinner", "Dessert", "Drinks"];

export default function AddRecipeModal({ onClose }) {
  const [showAlert, setShowAlert] = useState(false); // show alert if missing required fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    image_url: "",
    tags: [], // gonna insert this via recipe_tags table not recipes
  });

  // check if they've filled out all the required fields (everything above EXCEPT description or tags)
  const isFormValid = () =>
    formData.title.trim() &&
    formData.ingredients.trim() &&
    formData.steps.trim() &&
    formData.image_url.trim();

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // update the displayed form fields on change
  };

  const handleSubmit = async () => {
    if (!isFormValid()) { // if they missed a required field, ALERT
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    const payload = {
      ...formData,
      ingredients: formData.ingredients.split("\n").filter(Boolean), // split by new line and get rid of blanks
      steps: formData.steps.split("\n").filter(Boolean),
    };

    try { // POST request time
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Recipe added:", data);
        onClose();
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  };

  const handleTagToggle = (tag) => { // let them check/uncheck tags
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
          <TextField
            name="ingredients"
            label="Ingredients* (one per line)"
            multiline
            rows={3}
            value={formData.ingredients}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="steps"
            label="Steps (one per line)"
            multiline
            rows={4}
            value={formData.steps}
            onChange={handleChange}
            fullWidth
            required
          />
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
        <Button
          onClick={handleSubmit}
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
