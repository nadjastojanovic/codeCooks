import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const recipeId = searchParams.get("recipeId");
  if (!recipeId) {
    return new Response(
      JSON.stringify({ error: "recipeId is required" }),
      { status: 400 }
    );
  }

  const text = `
    SELECT c.*, u.username
    FROM comments_codecooks c
    JOIN users_codecooks u ON c.user_id = u.id
    WHERE c.recipe_id = $1
    ORDER BY c.created_at DESC
  `;
  const res = await query(text, [recipeId]);
  return new Response(JSON.stringify(res.rows), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  // only authenticated users
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token);
  if (!user) {
    return new Response(
      JSON.stringify({ error: "Not authenticated" }),
      { status: 401 }
    );
  }

  const { recipeId, content } = await request.json();
  if (!recipeId || !content?.trim()) {
    return new Response(
      JSON.stringify({ error: "recipeId and content required" }),
      { status: 400 }
    );
  }

  const text = `
    INSERT INTO comments_codecooks
      (user_id, recipe_id, content, likes, created_at)
    VALUES
      ($1, $2, $3, 0, NOW())
    RETURNING id, user_id, recipe_id, content, likes, created_at
  `;
  const res = await query(text, [user.id, recipeId, content.trim()]);
  const row = res.rows[0];

  const ures = await query(
    "SELECT username FROM users_codecooks WHERE id = $1",
    [user.id]
  );

  row.username = ures.rows[0].username;

  return new Response(JSON.stringify(row), {
    headers: { "Content-Type": "application/json" },
  });
}
