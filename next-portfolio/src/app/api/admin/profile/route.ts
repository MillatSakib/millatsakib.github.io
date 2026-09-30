import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getProfileImage, setProfileImage } from "@/lib/portfolio-db";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = await getProfileImage();
  return NextResponse.json({ url });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body.url) return NextResponse.json({ error: "url is required" }, { status: 400 });
  await setProfileImage(body.url);
  return NextResponse.json({ ok: true });
}
