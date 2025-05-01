"use client";

import { useState, useEffect } from "react";

import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";

import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

// created a separate page for the random-recipe bc the data
// returned from TheMealDB is in a different format and I'd
// have to change the recipe/[id]/page.js too much
export default function RandomRecipePage() {
  const [meal, setMeal] = useState(null);

  useEffect(() => { // request to TheMealDB (external API)
    fetch("../../api/external/random")
      .then((r) => r.json())
      .then((data) => setMeal(data))
      .catch(console.error);
  }, []);

  // loader while recipe is fetching
  if (!meal) {
    return <Loader />;
  }

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
            {/* external recipe label for the users to know */}
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

// not storing this recipe in the database or anything, so not showing comments or allowing them
// to favorite it

// maybe if we make it a daily thing, then we could store in the database for a day and allow comments etc.