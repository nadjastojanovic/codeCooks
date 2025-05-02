import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

// fetch individual recipe
export async function GET(request, context) {
  const { params } = context;
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;
  try {
    user = verifyToken(token);
  } catch (e) {
    user = null;
  }

  const qs = `
    SELECT r.*, u.username AS author_name, (f.user_id IS NOT NULL) AS "isFavorited"
    FROM recipes_codecooks r
    JOIN users_codecooks u ON r.author_id = u.id
    LEFT JOIN favorites_codecooks f ON r.id = f.recipe_id AND f.user_id = $2
    WHERE r.id = $1;
  `;

  const values = [id, user.id];
  const res = await query(qs, values);

  return new Response(JSON.stringify(res.rows[0]), {
    headers: { "Content-Type": "application/json" },
  });
}

// delete individual recipe
export async function DELETE(request, context) {
  const { params } = context;
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const user = verifyToken(token);

  if (!user) { // should not even have access to this route if unauth.
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const check = await query(`SELECT author_id FROM recipes_codecooks WHERE id = $1`, [id]);

  if (!check.rows.length || (check.rows[0].author_id !== user.id && !user.is_admin)) { // unknown user or not the same user as the currently authenticated one and not admin
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  await query("DELETE FROM recipes_codecooks WHERE id = $1", [id]);
  return new Response(null, { status: 204 });
}
