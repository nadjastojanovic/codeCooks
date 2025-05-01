"use client";

import { useState } from "react";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleDelete = async () => { // delete comment
    if (!confirm("Delete this comment?")) return;
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    onDeleted(id);
  };

  const handleLike = async () => { // upvote/like comment
    await fetch(`/api/comments/${id}`, { method: "PATCH" });
    setLikes(likes + 1);
  };

  // nice date formatting
  const date = new Date(created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // only can delete comment if:
  //    a) authenticated user AND it's their own comment
  //    b) admin
  const canDelete = isAuthenticated && user && (user.id === user_id || user.is_admin);

  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{username}</span>

        {/* comment creation date and delete button */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{date}</span>
          {canDelete && (
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
              type="button"
            >
              <DeleteIcon fontSize="small" />
            </button>
          )}
        </div>
      </div>

      {/* comment likes (can only be seen by authenticated users) */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-800">{content}</p>
        {isAuthenticated && (
          <Button size="small" onClick={handleLike}>
            ★ {likes}
          </Button>
        )}
      </div>

      <div className="h-4" />
    </div>
  );
}
