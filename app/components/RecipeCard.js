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

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      alert("Please log in to favorite recipes.");
      return;
    }
    onToggleFavorite(recipe.id, recipe.isFavorited);
  };

  return (
    <Card sx={{ maxWidth: 345, paddingBottom: 2, position: "relative" }}>
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
          <Typography sx={{ xs: "0.65rem", sm: "0.75rem", ml: "1rem" }} gutterBottom variant="h6" component="h2">
            {recipe.title}
          </Typography>
        </CardContent>
      </Link>

      <div className="flex justify-center mt-2">
        <Button
          type="button"
          variant="outlined"
          color={recipe.isFavorited ? "error" : "inherit"}
          sx={{
            mx: 1,
            mt: -2,
            mb: 2,
            textTransform: "none",
            opacity: isAuthenticated ? 1 : 0.5,
            fontSize: { xs: "0.65rem", sm: "0.75rem", ml: "1rem" },
          }}
          onClick={handleFavoriteClick}
        >
          {recipe.isFavorited ? "♥" : "♡"} {recipe.favorite_count || 0}{" "}
          Favorites
        </Button>
      </div>

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 p-2">
          {recipe.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              color="primary"
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "0.65rem", sm: "0.75rem", ml: "1rem" },
                padding: "6px 12px",
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
