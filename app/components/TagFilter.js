"use client";
import { Chip, Box } from "@mui/material";

export default function TagFilter({ selectedTag, setSelectedTag }) {
  const tags = ["All", "Dinner", "Dessert", "Pasta", "Savory"];

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          clickable
          color={selectedTag === tag ? "primary" : "default"}
          variant={selectedTag === tag ? "filled" : "outlined"}
          onClick={() => setSelectedTag(tag)}
        />
      ))}
    </Box>
  );
}
