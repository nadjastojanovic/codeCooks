import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const { recipeId, isFavorited } = await req.json();

  if (isFavorited) {
    await query(
      `INSERT INTO favorites_codecooks (user_id, recipe_id, favorited_at)
       VALUES ($1, $2, NOW()) ON CONFLICT DO NOTHING`,
      [user.id, recipeId]
    );
  } else {
    await query(
      `DELETE FROM favorites_codecooks WHERE user_id = $1 AND recipe_id = $2`,
      [user.id, recipeId]
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const res = await query(
    `
      SELECT r.id, r.title, r.image_url, ARRAY_AGG(t.name) AS tags
      FROM recipes_codecooks r
      JOIN favorites_codecooks f ON r.id = f.recipe_id
      LEFT JOIN recipe_tags_codecooks rt ON r.id = rt.recipe_id
      LEFT JOIN tags_codecooks t ON rt.tag_id = t.id
      WHERE f.user_id = $1
      GROUP BY r.id, r.title, r.image_url
    `,
    [user.id]
  );

  return new Response(JSON.stringify(res.rows), {
    headers: { "Content-Type": "application/json" },
  });
}
