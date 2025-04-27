import { NextResponse } from "next/server";
import { createToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function POST(req) {
  const { username, password } = await req.json();

  const userRes = await query(
    "SELECT id, username, email, is_admin, password_hash FROM users_codecooks WHERE username = $1",
    [username]
  );

  if (!userRes.rows.length) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const dbUser = userRes.rows[0];

  const valid = password === dbUser.password_hash; // TODO: bcrypt later

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createToken({
    id: dbUser.id,
    username: dbUser.username,
    is_admin: dbUser.is_admin, // ✅ Make sure this is inside the token!
  });

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res;
}
