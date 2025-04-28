import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

// route to GET recipes
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let user = null;
    try {
      user = verifyToken(token);
    } catch (e) {
      user = null;
    }

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    let qs;
    let values = [];

    const joinFavorites = user !== null;
    const selectIsFavorited = joinFavorites
      ? `CASE WHEN f1.user_id IS NOT NULL THEN true ELSE false END AS "isFavorited",`
      : "";
    const joinFavoritesClause = joinFavorites
      ? `LEFT JOIN favorites_codecooks f1 ON r.id = f1.recipe_id AND f1.user_id = $1`
      : "";

    if (!tag || tag === "All") {
      // No tag filter
      qs = `
        SELECT 
          r.id, 
          r.title, 
          r.image_url, 
          r.author_id, 
          ARRAY_AGG(DISTINCT t.name) AS tags,
          ${selectIsFavorited}
          COUNT(DISTINCT f2.user_id) AS favorite_count
        FROM recipes_codecooks r
        LEFT JOIN recipe_tags_codecooks rt ON r.id = rt.recipe_id
        LEFT JOIN tags_codecooks t ON rt.tag_id = t.id
        ${joinFavoritesClause}
        LEFT JOIN favorites_codecooks f2 ON r.id = f2.recipe_id
        GROUP BY r.id, r.title, r.image_url, r.author_id${
          joinFavorites ? ", f1.user_id" : ""
        }
      `;
      if (user) values.push(user.id);
    } else {
      // Tag filter — FIXED ✅
      qs = `
        SELECT 
          r.id, 
          r.title, 
          r.image_url, 
          r.author_id, 
          ARRAY_AGG(DISTINCT t.name) AS tags,
          ${selectIsFavorited}
          COUNT(DISTINCT f2.user_id) AS favorite_count
        FROM recipes_codecooks r
        LEFT JOIN recipe_tags_codecooks rt ON r.id = rt.recipe_id
        LEFT JOIN tags_codecooks t ON rt.tag_id = t.id
        ${joinFavoritesClause}
        LEFT JOIN favorites_codecooks f2 ON r.id = f2.recipe_id
        WHERE r.id IN (
          SELECT rt2.recipe_id
          FROM recipe_tags_codecooks rt2
          JOIN tags_codecooks t2 ON rt2.tag_id = t2.id
          WHERE t2.name = $${user ? 2 : 1}
        )
        GROUP BY r.id, r.title, r.image_url, r.author_id${
          joinFavorites ? ", f1.user_id" : ""
        }
      `;
      if (user) {
        values.push(user.id, tag);
      } else {
        values.push(tag);
      }
    }

    const res = await query(qs, values);

    return new Response(JSON.stringify(res.rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

// route to ADD RECIPE
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyToken(token);

    const body = await request.json();
    const now = new Date();

    const qs1 = `
      INSERT INTO recipes_codecooks (
        author_id, title, description, ingredients, steps, image_url, favorite_count, created_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      ) RETURNING id
    `;

    const values = [
      user.id,
      body.title,
      body.description || "",
      JSON.stringify(body.ingredients),
      JSON.stringify(body.steps),
      body.image_url,
      0,
      now.toISOString(),
    ];

    const res = await query(qs1, values);
    const recipeId = res.rows[0].id;

    for (const tag of body.tags) {
      const tagQuery = `SELECT id FROM tags_codecooks WHERE name = $1`;
      const tagRes = await query(tagQuery, [tag]);

      if (tagRes.rows.length > 0) {
        const tagId = tagRes.rows[0].id;
        await query(
          `INSERT INTO recipe_tags_codecooks (recipe_id, tag_id) VALUES ($1, $2)`,
          [recipeId, tagId]
        );
      }
    }

    return new Response(JSON.stringify({ message: "Recipe added", recipeId }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
