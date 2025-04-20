"use client";
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

export default function RecipeCard({ recipe }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        href={`/recipe/${recipe.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={recipe.imageUrl}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.title}
          </Typography>
        </CardContent>
      </Link>
      <Button
        variant="outlined"
        color={recipe.isFavorited ? "error" : "inherit"}
        sx={{ m: 2 }}
      >
        {recipe.isFavorited ? "♥ Unfavorite" : "♡ Favorite"}
      </Button>
    </Card>
  );
}
