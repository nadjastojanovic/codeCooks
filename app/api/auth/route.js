import { NextResponse } from "next/server";
import { createToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function POST(req) {
  const { username, password } = await req.json();

  const user = await query(
    "SELECT * FROM users_codecooks WHERE username = $1",
    [username]
  );

  if (!user.rows.length) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const valid = password === user.rows[0].password_hash; // Replace with bcrypt later

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createToken(user.rows[0]);

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
