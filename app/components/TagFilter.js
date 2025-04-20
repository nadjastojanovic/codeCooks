"use client";
import { useState } from "react";
import { Box, Chip } from "@mui/material";

export default function TagFilter() {
  const tags = ["All", "Dinner", "Dessert", "Pasta", "Savory"];
  const [selected, setSelected] = useState("All");

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          clickable
          color={selected === tag ? "primary" : "default"}
          variant={selected === tag ? "filled" : "outlined"}
          onClick={() => setSelected(tag)}
        />
      ))}
    </Box>
  );
}
