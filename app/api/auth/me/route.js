import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function GET() {
  const token = cookies().get("token")?.value;
  const userData = verifyToken(token);

  if (!userData) {
    return Response.json({ user: null });
  }

  const result = await query(
    "SELECT id, username, email FROM users_codecooks WHERE id = $1",
    [userData.id]
  );

  return Response.json({ user: result.rows[0] });
}
