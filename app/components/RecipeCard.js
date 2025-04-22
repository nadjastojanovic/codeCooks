"use client";
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip
} from "@mui/material";

export default function RecipeCard({ isAuthenticated, recipe, onToggleFavorite }) {
  return (
    <Card sx={{ maxWidth: 345, paddingBottom: 2 }}>
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

      <div>
        {recipe.tags && recipe.tags.length > 0 && ( // display this recipe's tags
          <div className="flex space-x-2">
            {recipe.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="primary" // blue
                style={{
                  color: "white",
                  fontWeight: "bold",
                  margin: "0 -5px 0 15px",
                  padding: "6px 12px",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {isAuthenticated  && (
        <Button
          variant="outlined"
          color={recipe.isFavorited ? "error" : "inherit"}
          sx={{ m: 2 }}
          onClick={() => onToggleFavorite(recipe.id)}
        >
          {recipe.isFavorited ? "♥ Unfavorite" : "♡ Favorite"}
        </Button>
      )}
      
    </Card>
  );
}
