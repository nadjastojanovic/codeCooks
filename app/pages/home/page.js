"use client";
import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import TagFilter from "../../components/TagFilter";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All"); // by default, show all recipes

  // function to load recipes, with optional filtering by tag
  const fetchRecipes = async () => {
    try {
      const tagParam = selectedTag !== "All" ? `?tag=${selectedTag}` : ""; // use all by default or whatever they selected
      const response = await fetch(`/api/recipes${tagParam}`); // route
      const data = await response.json();
      setRecipes(data);
      console.log(data)
    } catch (err) {
      console.error("Failed to fetch recipes", err);
    }
  };

  // update recipes in place when they select a new tag
  useEffect(() => {
    fetchRecipes();
    console.log(recipes);
  }, [selectedTag]);

  // toggles the favorite state and sends it to the server
  const toggleFavorite = async (recipeId, isFavorited) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, isFavorited: !isFavorited }),
      });

      if (res.ok) {
        // flip the favorited state for this recipe
        setRecipes((prev) =>
          prev.map((r) =>
            r.id === recipeId ? { ...r, isFavorited: !isFavorited } : r
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <>
      <Navbar/>
      <main className="py-10 flex justify-center">
        {/* <div className="bg-blue-500 text-white p-4">Tailwind works!</div> */}

        <div className="w-full max-w-4xl px-4">
          <TagFilter
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={(id) =>
                  toggleFavorite(id, recipe.isFavorited)
                }
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
