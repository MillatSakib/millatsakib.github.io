import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import getMongoClient from "@/lib/mongodb";
import { objectId } from "@/lib/portfolio-db";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = await objectId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  await (await getMongoClient()).db(process.env.MONGODB_DB || "portfolio").collection("projects").deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = await objectId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  
  const body = await req.json();
  const db = (await getMongoClient()).db(process.env.MONGODB_DB || "portfolio");
  
  await db.collection("projects").updateOne(
    { _id: id },
    { $set: body }
  );
  
  return NextResponse.json({ ok: true });
}
