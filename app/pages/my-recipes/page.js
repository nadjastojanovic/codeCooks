"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";

export default function MyRecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMyRecipes = async () => {
    const res = await fetch("/api/myRecipes");

    const data = await res.json();
    console.log(data)

    setRecipes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMyRecipes();
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
    <>
        <Navbar />
        <main className="py-10 flex justify-center">
            <div className="w-full max-w-4xl px-4">
                <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
                {recipes.map((recipe) => (
                    <RecipeCard
                    key={recipe.id}
                    recipe={{ ...recipe, isFavorited: true }}
                    onToggleFavorite={(id) => handleToggle(id, true)}
                    />
                ))}
                </div>
            </div>
        </main>
    </>
  );
}