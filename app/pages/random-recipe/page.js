"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";

export default function RandomRecipePage() {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch("../../api/external/random")
      .then((r) => r.json())
      .then((data) => setMeal(data))
      .catch(console.error);
  }, []);

  if (!meal) return <div className="p-8 text-center">Loading…</div>;

  return (
    <>
      <Navbar />
      <div className="py-10 flex justify-center">
        <main className="w-1/2 mx-auto">
          <div className="h-8" />
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold">
              {meal.title}
            </h1>
            <Button
              startIcon={<StarIcon />}
              variant="contained"
              color="warning"
              sx={{ m: 1}}
            >
              External Recipe
            </Button>
          </div>

          <div className="h-2" />

          <div className="w-full h-[400px] overflow-hidden rounded-lg">
            <img
              src={meal.image_url}
              alt={meal.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="h-2" />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc list-inside text-lg text-gray-900 space-y-2">
              {meal.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </section>

          <div className="h-2" />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Steps</h2>
            <ol className="list-decimal list-inside text-lg text-gray-900 space-y-3">
              {meal.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
          <div className="h-8" />
        </main>
      </div>
    </>
  );
}
