import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

// get all recipes authored by currently authenticated users
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = verifyToken(token);

  if (!user) { // should not even have access to this route if unauth.
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const text = `
    SELECT r.id, r.title, r.image_url, r.author_id,
      ARRAY_AGG(DISTINCT t.name) AS tags,
      COUNT(DISTINCT f.user_id) AS favorite_count,
      CASE WHEN f2.user_id IS NOT NULL THEN true ELSE false END AS "isFavorited"
    FROM recipes_codecooks r
    LEFT JOIN recipe_tags_codecooks rt ON r.id = rt.recipe_id
    LEFT JOIN tags_codecooks t ON rt.tag_id = t.id
    LEFT JOIN favorites_codecooks f ON r.id = f.recipe_id
    LEFT JOIN favorites_codecooks f2 ON r.id = f2.recipe_id AND f2.user_id = $1
    WHERE r.author_id = $1
    GROUP BY r.id, f2.user_id
  `;

  const res = await query(text, [user.id]);

  return new Response(JSON.stringify(res.rows), {
    headers: { "Content-Type": "application/json" },
  });
}
