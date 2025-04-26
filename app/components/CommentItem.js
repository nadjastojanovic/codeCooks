"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../context/authContext";

export default function CommentItem({
  id,
  user_id,
  username,
  content,
  likes: initialLikes,
  created_at,
  onDeleted,
}) {
  const { user, isAuthenticated } = useAuth();
  const [likes, setLikes] = useState(initialLikes);

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    onDeleted(id);
  };

  const handleLike = async () => {
    await fetch(`/api/comments/${id}`, { method: "PATCH" });
    setLikes(likes + 1);
  };

  const date = new Date(created_at).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"
  });

  return (
    <div className="border-b pb-4 mb-4">
      <div className="h-4" />
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{username}</span> {/* NADJA: this needs work */}
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="my-2 text-gray-800">{content}</p>
        {isAuthenticated && (
          <>
            <Button size="small" onClick={handleLike}>
             ★ {likes}
            </Button>
            {isAuthenticated && user?.id === user_id && (
              <Button size="small" color="error" onClick={handleDelete}>
                Delete
              </Button>
             )}
          </>
        )}
      </div>
      <div className="h-4" />
    </div>
  );
}