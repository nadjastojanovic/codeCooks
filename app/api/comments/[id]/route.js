import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function DELETE(request, { params }) {
  const { id } = params;

  const cookieStore = await cookies();
  const token = (await cookieStore).get("token")?.value;
  const user = verifyToken(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });
  }

  const { rows } = await query(
    "SELECT user_id FROM comments_codecooks WHERE id = $1",
    [id]
  );

  if (!rows.length || (rows[0].user_id !== user.id && !user.is_admin)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  await query("DELETE FROM comments_codecooks WHERE id = $1", [id]);
  return new Response(null, { status: 204 });
}

export async function PATCH(request, { params }) {
  // increment likes
  const { id } = await params;
  await query("UPDATE comments_codecooks SET likes = likes + 1 WHERE id = $1", [
    id,
  ]);
  return new Response(null, { status: 204 });
}
