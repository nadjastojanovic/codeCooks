import { query } from "@/app/db/postgres";

export async function POST(req) {
  const { username, email, password } = await req.json();

  const existing = await query(
    "SELECT * FROM users_codecooks WHERE username = $1 OR email = $2",
    [username, email]
  );

  if (existing.rows.length > 0) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const now = new Date().toISOString();

  const result = await query(
    `INSERT INTO users_codecooks (username, email, password_hash, is_admin, created_at)
     VALUES ($1, $2, $3, $4, $5) RETURNING id, username`,
    [username, email, password, false, now]
  );

  return new Response(JSON.stringify({ user: result.rows[0] }), {
    headers: { "Content-Type": "application/json" },
  });
}
