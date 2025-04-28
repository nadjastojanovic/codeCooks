"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, IconButton, Stack } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import CommentItem from "@/app/components/CommentItem";
import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../context/authContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function RecipePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const recipeRef = useRef(null);
  const exportRef = useRef(null);

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
        body: JSON.stringify({ recipeId: id, isFavorited: isFav }),
      });
      setIsFav((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  const handleExport = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${recipe.title}.pdf`);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-10">
        <main className="w-1/2 mx-auto" ref={recipeRef}>
          <div className="h-8" />

          {/* Title and Buttons */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold">{recipe.title}</h1>

            <Stack direction="row" spacing={1}>
              {/* Export */}
              <IconButton onClick={handleExport} color="primary">
                <FileUploadIcon />
              </IconButton>

              {/* Favorite */}
              {isAuthenticated && (
                <Button
                  variant="outlined"
                  color={isFav ? "error" : "inherit"}
                  onClick={toggleFavorite}
                >
                  {isFav ? "♥ Unfavorite" : "♡ Favorite"}
                </Button>
              )}

              {/* Delete */}
              {isAuthenticated &&
                (user?.id === recipe.author_id || user?.is_admin) && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteRecipe}
                  >
                    Delete
                  </Button>
                )}
            </Stack>
          </div>

          {/* Author and Date */}
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

          {/* Description */}
          {recipe.description && (
            <p className="text-lg text-gray-900">{recipe.description}</p>
          )}

          <div className="h-2" />

          {/* Image */}
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

          <div className="h-2" />

          {/* Ingredients */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc list-inside text-lg text-gray-900 space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </section>

          <div className="h-2" />

          {/* Steps */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Steps</h2>
            <ol className="list-decimal list-inside text-lg text-gray-900 space-y-3">
              {recipe.steps.map((step, i) => {
                const clean = step.replace(/^\d+\.\s*/, "");
                return <li key={i}>{clean}</li>;
              })}
            </ol>
          </section>

          <div className="h-8" />

          {/* Comments */}
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
          </div>
        </main>
      </div>

      {/* Hidden div for export */}
      <div
        ref={exportRef}
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
      >
        <div
          style={{
            width: "600px",
            background: "white",
            padding: "24px",
            color: "black",
          }}
        >
          <h1>{recipe.title}</h1>
          <img
            src={recipe.image_url}
            alt={recipe.title}
            style={{ width: "100%", height: "auto", marginBottom: "20px" }}
          />
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
          <h2>Steps</h2>
          <ol>
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p style={{ marginTop: "20px" }}>By {recipe.author_name}</p>
        </div>
      </div>
    </>
  );
}
