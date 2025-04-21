"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecipeCard from "../../components/RecipeCard";

export default function FavoritesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      const res = await fetch("/api/favorites");

      if (res.status === 401) {
        router.push("/");
        return;
      }

      const data = await res.json();
      setRecipes(data);
      setLoading(false);
    };

    loadFavorites();
  }, [router]);

  const handleToggle = async (recipeId, isFavorited) => {
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId, isFavorited: !isFavorited }),
    });

    //  remove from UI on unfavorite
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recipes.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={{ ...r, isFavorited: true }}
            onToggleFavorite={(id) => handleToggle(id, true)}
          />
        ))}
      </div>
    </div>
  );
}
