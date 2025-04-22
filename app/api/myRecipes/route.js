import { cookies } from "next/headers"; // to get the user id
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const user = verifyToken(token);

        const qs = `
            SELECT r.id, r.title, r.description, r.image_url, r.favorite_count, r.created_at,
            CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS "isFavorited"
            FROM recipes_codecooks r
            LEFT JOIN favorites_codecooks f ON r.id = f.recipe_id AND f.user_id = $1
            WHERE r.author_id = $1
            ORDER BY r.created_at DESC;`;

        const values = [user.id];

        const res = await query(qs, values);

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
