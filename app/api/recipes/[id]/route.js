import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function GET(request, context) {
  const { params } = await context;
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let userId = null;

  try {
    userId = verifyToken(token).id;
  } catch {
    userId = null;
  }

  const text = `
    SELECT
      r.*, u.username AS author_name,
      (f.user_id IS NOT NULL) AS "isFavorited"
    FROM recipes_codecooks r
    JOIN users_codecooks u ON r.author_id = u.id
    LEFT JOIN favorites_codecooks f ON r.id = f.recipe_id AND f.user_id = $2
    WHERE r.id = $1;
  `;

  const values = [id, userId];

  const res = await query(text, values);
  if (res.rows.length === 0) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(res.rows[0]), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(request, context) {
  const { params } = await context;
  const { id } = params;

  // Authenticate
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let userId;
  try {
    userId = verifyToken(token).id;
  } catch {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Only allow recipe author to delete
  const check = await query(
    "SELECT author_id FROM recipes_codecooks WHERE id = $1",
    [id]
  );
  if (!check.rows.length || check.rows[0].author_id !== userId) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Perform delete
  await query("DELETE FROM recipes_codecooks WHERE id = $1", [id]);
  return new Response(null, { status: 204 });
}