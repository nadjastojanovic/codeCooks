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
      <main className="py-10 flex justify-center">
        {/* <div className="bg-blue-500 text-white p-4">Tailwind works!</div> */}

        <div className="w-full max-w-4xl px-4">
          <TagFilter
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
