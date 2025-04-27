import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/auth";
import { query } from "@/app/db/postgres";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userFromToken = verifyToken(token);

    if (!userFromToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const dbRes = await query(
      "SELECT id, username, email, is_admin FROM users_codecooks WHERE id = $1",
      [userFromToken.id]
    );

    if (!dbRes.rows.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(dbRes.rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
