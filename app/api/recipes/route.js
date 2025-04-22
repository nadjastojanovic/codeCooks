import { cookies } from "next/headers"; // to get the user id
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres"

// route to GET recipes
export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        let user = null;
        try { // authenticated
            user = verifyToken(token);
        } catch (e) { // unauthenticated
            user = null;
        }

        const { searchParams } = new URL(request.url);
        const tag = searchParams.get("tag"); // have they selected a tag (one at a time)
    
        let qs;
        let values = [];

        let joinFavorites = user !== null;
        let selectIsFavorited = joinFavorites
            ? `CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS "isFavorited",`
            : "";
        let joinFavoritesClause = joinFavorites
            ? `LEFT JOIN favorites_codecooks f ON r.id = f.recipe_id AND f.user_id = $1`
            : "";

        if (!tag || tag === "All") {
            qs = `
                SELECT r.id, r.title, r.image_url, ARRAY_AGG(t.name) AS tags,
                ${selectIsFavorited}
                r.title -- to avoid GROUP BY error if isFavorited is excluded
                FROM recipes_codecooks r
                LEFT JOIN recipe_tags_codecooks rt ON r.id = rt.recipe_id
                LEFT JOIN tags_codecooks t ON rt.tag_id = t.id
                ${joinFavoritesClause}
                GROUP BY r.id, r.title, r.image_url${joinFavorites ? ', f.user_id' : ''}`;
            if (user) values.push(user.id);
        } else {
            qs = `
                SELECT r.id, r.title, r.image_url, t.name AS tag,
                ${selectIsFavorited}
                r.title
                FROM recipes_codecooks r
                JOIN recipe_tags_codecooks rt ON r.id = rt.recipe_id
                JOIN tags_codecooks t ON rt.tag_id = t.id
                ${joinFavoritesClause}
                WHERE t.name = $${joinFavorites ? 2 : 1}`;
            if (user) {
                values.push(user.id, tag);
            } else {
                values.push(tag);
            }
        }

        let res = await query(qs, values);
    
        return new Response(JSON.stringify(res.rows), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// route to ADD RECIPE
export async function POST(request) {
    try {
        let body = await request.json()
        const now = new Date() // this will be for the timestamp

        // no checking for empty fields because the modal will alert them if they leave a field blank

        // Query 1: add recipe into recipes table
        let qs1 = `
            INSERT INTO recipes_codecooks (
                author_id, title, description, ingredients, steps, image_url, favorite_count, created_at
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            ) RETURNING id`

        let values = [
            body.author_id,                     // ID of user from users table
            body.title,                         // recipe title
            body.description || "",             // recipe description (OPTIONAL) everything else is mandatory
            JSON.stringify(body.ingredients),   // recipe ingredients
            JSON.stringify(body.steps),         // recipe steps
            body.image_url,                     // url for a thumbnail image
            0,                                  // favorite_count gets initialized at this point to 0
            now.toISOString()
        ]

        let res = await query(qs1, values) // do tha query
        const recipeId = res.rows[0].id;

        // Query 2: add tag for this recipe with the recipe id into recipe_tags table
        for (const tag of body.tags) {
            const tagQuery = `SELECT id FROM tags_codecooks WHERE name = $1`; // find the right tag
            const tagRes = await query(tagQuery, [tag]);

            if (tagRes.rows.length > 0) {
                const tagId = tagRes.rows[0].id;

                await query(
                    `INSERT INTO recipe_tags_codecooks (recipe_id, tag_id) VALUES ($1, $2)`, // add recipe id + tag combo into the table
                    [recipeId, tagId]
                );
            }
        }

        return new Response(JSON.stringify({ message: "Recipe added", recipeId }), {
            headers: { "Content-Type": "application/json" }
        })
    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        })
    }
}
