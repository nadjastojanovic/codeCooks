import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import TagFilter from "../../components/TagFilter";

export default function HomePage() {
  const mockRecipes = [
    {
      id: 1,
      title: "Spaghetti",
      imageUrl: "/spaghetti.jpg",
      isFavorited: false,
    },
    {
      id: 2,
      title: "Chicken Tikka",
      imageUrl: "/tikka.jpg",
      isFavorited: true,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="p-6">
        <TagFilter />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {mockRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  );
}
