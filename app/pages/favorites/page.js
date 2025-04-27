"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import Loader from "../../components/Loader";

export default function FavoritesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    const res = await fetch("/api/favorites");
    const data = await res.json();
    console.log(data);

    setRecipes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, [router]);

  const handleToggle = async (recipeId, isFavorited) => {
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, isFavorited }),
      });

      // remove from UI on unfavorite
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    } catch (err) {
      console.error("Failed to unfavorite recipe", err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <main className="py-10 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={(id, isFavorited) =>
                  handleToggle(id, isFavorited)
                }
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
