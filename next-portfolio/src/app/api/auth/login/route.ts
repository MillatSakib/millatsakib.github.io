import { NextResponse } from "next/server";
import { cookieName, createSession } from "@/lib/auth";

function envValue(name: string) {
  const value = process.env[name] ?? "";
  return value.trim().replace(/^(['"])(.*)\1$/, "$2");
}

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: unknown; password?: unknown };
  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (username !== envValue("ADMIN_USERNAME") || password !== envValue("ADMIN_PASSWORD")) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(cookieName, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 12, path: "/" });
  return response;
}
