import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

// GET recipes - is there a simpler way to do this
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
    const isFiltered = tag && tag !== "All"; // did they filter by tag or not

    const selectIsFavorited = user
      ? `CASE WHEN f1.user_id IS NOT NULL THEN true ELSE false END AS "isFavorited",`
      : "";
    const joinFavorites = user
      ? `LEFT JOIN favorites_codecooks f1 ON r.id = f1.recipe_id AND f1.user_id = $1`
      : "";

    const values = user ? [user.id] : []; // unauth, no need to pass values
    if (isFiltered) values.push(tag); // if used tag flter, need to include that in values

    const whereClause = isFiltered // if used tag filter, filter according to that by using the recipe_tags table
    ? `WHERE r.id IN (
        SELECT rt2.recipe_id
        FROM recipe_tags_codecooks rt2
        JOIN tags_codecooks t2 ON rt2.tag_id = t2.id
        WHERE t2.name = $${values.length})`
    : "";

    // put everything together :')
    const qs = `
      SELECT r.id, r.title, r.image_url, r.author_id,
        ARRAY_AGG(DISTINCT t.name) AS tags,
        ${selectIsFavorited}
        COUNT(DISTINCT f2.user_id) AS favorite_count
      FROM recipes_codecooks r
      LEFT JOIN recipe_tags_codecooks rt ON r.id = rt.recipe_id
      LEFT JOIN tags_codecooks t ON rt.tag_id = t.id
      ${joinFavorites}
      LEFT JOIN favorites_codecooks f2 ON r.id = f2.recipe_id
      ${whereClause}
      GROUP BY r.id, r.title, r.image_url, r.author_id${joinFavorites ? ", f1.user_id" : ""}`;

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

// POST recipe
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const user = verifyToken(token);

    const body = await request.json();
    
    const qs1 = `
      INSERT INTO recipes_codecooks (author_id, title, description, ingredients, steps, image_url, favorite_count, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id
    `;

    const values = [
      user.id,
      body.title,
      body.description || "", // optional
      JSON.stringify(body.ingredients),
      JSON.stringify(body.steps),
      body.image_url,
      0, // favorite count = 0 at creation
      // creation date (moved into the query now)
    ];

    const recipeRes = await query(qs1, values);
    const recipeId = recipeRes.rows[0].id;

    // when recipe is added, tags should be inserted into recipe_tags table
    for (const tag of body.tags) {
      // need to get tag id
      const tagRes = await query(`SELECT id FROM tags_codecooks WHERE name = $1`, [tag]);
      const tagId = tagRes.rows[0].id;
      // in order to insert into recipe_tags table
      await query(
        `INSERT INTO recipe_tags_codecooks (recipe_id, tag_id) VALUES ($1, $2)`,
        [recipeId, tagId]
      );
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
