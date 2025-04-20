"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import TagFilter from "../../components/TagFilter";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState("All");

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Spaghetti",
      imageUrl: "/spaghetti.jpg",
      isFavorited: false,
      tag: "Dinner",
    },
    {
      id: 2,
      title: "Chocolate Cake",
      imageUrl: "/cake.jpg",
      isFavorited: true,
      tag: "Dessert",
    },
    {
      id: 3,
      title: "Chicken Tikka",
      imageUrl: "/tikka.jpg",
      isFavorited: false,
      tag: "Dinner",
    },
  ]);

  const toggleFavorite = (id) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorited: !r.isFavorited } : r))
    );
  };

  const filteredRecipes =
    selectedTag === "All"
      ? recipes
      : recipes.filter((r) => r.tag === selectedTag);

  return (
    <>
      <Navbar />
      <main className="p-6">
        <TagFilter selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </main>
    </>
  );
}
