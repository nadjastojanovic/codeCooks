import { query } from "@/app/db/postgres"

// route to ADD RECIPE
export async function POST(request) {
    try {
        let body = await request.json()
        const now = new Date() // this will be for the timestamp

        // no checking for empty fields because the modal will alert them if they leave a field blank

        // SQL query
        let qs = `
            INSERT INTO recipes_codecooks (
                author_id, title, description, ingredients, steps, image_url, favorite_count, created_at
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
            )`

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
        
        let res = await query(qs, values) // do tha query

        return new Response(JSON.stringify({ rowsInserted: res.rowCount }), {
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
