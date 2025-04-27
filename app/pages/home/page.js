"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import TagFilter from "../../components/TagFilter";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All"); // by default, show all recipes

  const [searchTerm, setSearchTerm] = useState(""); // for the search bar
  const pathname = usePathname();

  const router = useRouter();

  // function to load recipes, with optional filtering by tag
  const fetchRecipes = async () => {
    try {
      const tagParam = selectedTag !== "All" ? `?tag=${selectedTag}` : ""; // use all by default or whatever they selected
      const response = await fetch(`/api/recipes${tagParam}`); // route
      const data = await response.json();
      setRecipes(data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch recipes", err);
    }
  };

  // update recipes when they select a new tag
  useEffect(() => {
    fetchRecipes();
  }, [selectedTag]);

  // toggle favorite state
  const toggleFavorite = async (recipeId, isFavorited) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, isFavorited }),
      });

      if (res.ok) {
        setRecipes((prev) =>
          prev.map((r) =>
            r.id === recipeId
              ? {
                  ...r,
                  isFavorited: !isFavorited,
                  favorite_count:
                    Number(r.favorite_count) + (isFavorited ? -1 : 1),
                }
              : r
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  const displayed = recipes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // delete recipe
  const handleDeleteRecipe = async (recipeId) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await fetch(`/api/recipes/${recipeId}`, { method: "DELETE" });
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    } catch (err) {
      console.error("Failed to delete recipe", err);
    }
  };

  return (
    <>
      <Navbar showSearch={pathname === "/"} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="py-10 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <TagFilter
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
            {displayed.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={(id, isFavorited) =>
                  toggleFavorite(id, isFavorited)
                }
                onDeleteRecipe={handleDeleteRecipe}
              />
            ))}
          </div>

          <div className="h-8" />

          <div
            className="mt-12 cursor-pointer overflow-hidden h-48 rounded-lg bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://static.vecteezy.com/system/resources/thumbnails/053/454/299/small_2x/colorful-assortment-of-asian-dishes-served-on-a-dark-table-with-chopsticks-and-sauces-photo.jpg')",
            }}
            onClick={() => router.push("/pages/random-recipe")}
          >
            <div className="h-full flex flex-col w-1/2 justify-center items-center">
              <h2 className="text-2xl font-bold text-white">
                Can't find what you're looking for?
              </h2>
              <p className="mt-2 text-lg text-white">
                Discover today's surprise from TheMealDB!
              </p>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </main>
    </>
  );
}
