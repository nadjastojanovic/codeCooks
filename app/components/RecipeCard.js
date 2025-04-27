"use client";
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { useAuth } from "../context/authContext";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecipeCard({
  recipe,
  onToggleFavorite,
  onDeleteRecipe,
}) {
  const { user, isAuthenticated } = useAuth();
  console.log("In RecipeCard:", user, isAuthenticated);

  const canDelete =
    isAuthenticated && user && (user.id === recipe.author_id || user.is_admin);

  return (
    <Card sx={{ maxWidth: 345, paddingBottom: 2, position: "relative" }}>
      {/* Show delete button only if user can delete */}
      {canDelete && (
        <button
          onClick={() => onDeleteRecipe(recipe.id)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          type="button"
        >
          <DeleteIcon />
        </button>
      )}

      <Link
        href={`/recipe/${recipe.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          image={recipe.image_url}
          alt={recipe.title}
          sx={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            display: "block",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.title}
          </Typography>
        </CardContent>
      </Link>

      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-2">
          {recipe.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color="primary"
              style={{
                color: "white",
                fontWeight: "bold",
                padding: "6px 12px",
              }}
            />
          ))}
        </div>
      )}

      {isAuthenticated && (
        <div className="flex justify-center mt-2">
          <Button
            type="button"
            variant="outlined"
            color={recipe.isFavorited ? "error" : "inherit"}
            sx={{ m: 1, textTransform: "none" }}
            onClick={() => onToggleFavorite(recipe.id, recipe.isFavorited)}
          >
            {recipe.isFavorited ? "♥" : "♡"} {recipe.favorite_count || 0}{" "}
            Favorites
          </Button>
        </div>
      )}
    </Card>
  );
}
