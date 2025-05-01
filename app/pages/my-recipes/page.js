"use client";
import { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import TagFilter from "../../components/TagFilter";
import Loader from "../../components/Loader";

export default function MyRecipesPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const loadMyRecipes = async () => {
    const res = await fetch("/api/myRecipes");
    const data = await res.json();
    setRecipes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMyRecipes();
  }, [router]);

  const handleToggle = async (recipeId, isFavorited) => {
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId, isFavorited }),
      });

      if (isFavorited) {
        // if unfavoriting, remove from favorites
        setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
      } else {
        // if favoriting (should not happen in favorites page), or stay favorited
        setRecipes((prev) =>
          prev.map((r) =>
            r.id === recipeId
              ? {
                  ...r,
                  isFavorited: true,
                  favorite_count: Number(r.favorite_count) + 1,
                }
              : r
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  // search bar and tag filter
  const displayedRecipes = recipes
    .filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((r) => selectedTag === "All" || r.tags?.includes(selectedTag));

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar
        showSearch={pathname === "/my-recipes"}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="py-10 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <h1 className="text-2xl font-bold mb-4">My Recipes</h1>

          <TagFilter
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
            {displayedRecipes.map((recipe) => (
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
