import { NextResponse } from "next/server"; import { requireAdmin } from "@/lib/auth"; import getMongoClient from "@/lib/mongodb"; import { objectId } from "@/lib/portfolio-db";
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await requireAdmin())) return NextResponse.json({error:"Unauthorized"},{status:401}); const id=await objectId((await params).id); if(!id) return NextResponse.json({error:"Invalid id"},{status:400}); const d=(await getMongoClient()).db(process.env.MONGODB_DB||"portfolio"); const cat=await d.collection("categories").findOne({_id:id}); if(cat) await d.collection("skills").deleteMany({categoryId:cat.id}); await d.collection("categories").deleteOne({_id:id}); await import("next/cache").then(m => m.revalidatePath("/")); return NextResponse.json({ok:true}); }

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = await objectId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const body = await req.json();
  const d = (await getMongoClient()).db(process.env.MONGODB_DB || "portfolio");
  await d.collection("categories").updateOne({ _id: id }, { $set: body });
  await import("next/cache").then(m => m.revalidatePath("/"));
  return NextResponse.json({ ok: true });
}
