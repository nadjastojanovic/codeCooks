"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // to get recipe id from url
import { Button } from "@mui/material";

import { PhotoProvider, PhotoView } from "react-photo-view"; // new library requirement

import CommentItem from "@/app/components/CommentItem";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/authContext";

export default function RecipePage() {
  const { id } = useParams(); // get recipe id from url
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?recipeId=${id}`);
    setComments(await res.json());
  };

  const fetchRecipe = async () => {
    const res = await fetch(`/api/recipes/${id}`);
    if (!res.ok) {
      console.error("Failed to load recipe");
      return;
    }
    const data = await res.json();
    setRecipe(data);
    setLoading(false);
    setIsFav(data.isFavorited);
  };

  useEffect(() => {
    fetchRecipe();
    fetchComments();
    console.log(user);
  }, [id]);

  const handleDeleteRecipe = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (res.ok) router.push("/");
    else console.error("Failed to delete recipe");
  };

  const postComment = async () => {
    if (!newComment.trim()) return;
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id, content: newComment }),
    });
    const c = await res.json();
    setComments([c, ...comments]);
    setNewComment("");
  };

  const removeComment = (cid) => {
    setComments(comments.filter((c) => c.id !== cid));
  };

  const toggleFavorite = async () => {
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: id, isFavorited: !isFav }),
      });
      setIsFav((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading…</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-10">
        <main className="w-1/2 mx-auto">
          <div className="h-8" />{" "}
          {/* spacer bc for some reason no vertical margins would apply*/}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold">{recipe.title}</h1>
            <div className="flex space-x-4">
              {isAuthenticated && (
                <Button
                  variant="outlined"
                  color={recipe.isFavorited ? "error" : "inherit"}
                  sx={{ my: 1 }}
                  onClick={() => toggleFavorite()}
                >
                  {isFav ? "♥ Unfavorite" : "♡ Favorite"}
                </Button>
              )}
              {isAuthenticated &&
                (user?.id === recipe.author_id || user?.is_admin) && (
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    color="error"
                    onClick={handleDeleteRecipe}
                  >
                    Delete
                  </Button>
                )}
            </div>
          </div>
          <div className="p-4 rounded mb-8 flex justify-between">
            <span className="font-medium text-gray-700">
              By {recipe.author_name}
            </span>
            <span className="font-medium text-gray-700">
              {new Date(recipe.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
          <div className="h-8" />{" "}
          {/* spacer bc for some reason no vertical margins would apply*/}
          {recipe.description && (
            <p className="text-lg text-gray-900">{recipe.description}</p>
          )}
          <div className="h-2" />{" "}
          {/* spacer bc for some reason no vertical margins would apply*/}
          <PhotoProvider>
            <div className="w-full h-[400px] overflow-hidden rounded-lg">
              <PhotoView src={recipe.image_url}>
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </PhotoView>
            </div>
          </PhotoProvider>
          <div className="h-2" />{" "}
          {/* spacer bc for some reason no vertical margins would apply*/}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc list-inside text-lg text-gray-900 space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </section>
          <div className="h-2" />{" "}
          {/* spacer bc for some reason no vertical margins would apply*/}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Steps</h2>
            <ol className="list-decimal text-lg list-inside text-gray-900 space-y-3">
              {recipe.steps.map((step, i) => {
                const clean = step.replace(/^\d+\.\s*/, ""); // remove the beginning 1. 2. etc. bc they get duplicated
                return <li key={i}>{clean}</li>;
              })}
            </ol>
          </section>
          <div className="h-8" />{" "}
          {/* spacer bc for some reason no vertical margins would apply*/}
          <div className="w-full mx-auto py-8">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {comments.map((c) => (
              <CommentItem key={c.id} {...c} onDeleted={removeComment} />
            ))}
            {isAuthenticated ? (
              <div className="mb-6">
                <textarea
                  rows={3}
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Add a comment…"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="contained" onClick={postComment}>
                  Post Comment
                </Button>
              </div>
            ) : (
              <p className="italic text-gray-600 mb-4">
                Log in to leave a comment.
              </p>
            )}
            <div className="h-8" />
          </div>
        </main>
      </div>
    </>
  );
}
