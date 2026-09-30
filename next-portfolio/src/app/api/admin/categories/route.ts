import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth"; import getMongoClient from "@/lib/mongodb";
import { portfolioData } from "@/models/portfolioModel";
export async function GET() { 
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 
  const d=(await getMongoClient()).db(process.env.MONGODB_DB||"portfolio"); 
  if (!(await d.collection("categories").countDocuments())) { 
    await d.collection("categories").insertMany(portfolioData.skills.map((category) => ({ id: category.id, label: category.label }))); 
    await d.collection("skills").insertMany(portfolioData.skills.flatMap((category) => category.items.map((skill) => ({ ...skill, categoryId: category.id })))); 
  } 
  const categories = await d.collection("categories").find({}, { projection: { _id: 1, id: 1, label: 1, position: 1 } }).sort({ position: 1, _id: 1 }).toArray(); 
  const skills = await d.collection("skills").find({}).sort({ position: 1, _id: 1 }).toArray();
  return NextResponse.json(categories.map((category) => ({ 
    ...category, 
    _id: category._id.toString(),
    items: skills.filter(s => s.categoryId === category.id).map(s => ({ ...s, _id: s._id.toString() }))
  }))); 
}
export async function POST(req: Request) { 
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); 
  const { id, label, position }=await req.json(); 
  if (!id || !label) return NextResponse.json({ error: "ID and label are required" }, { status: 400 }); 
  const d=(await getMongoClient()).db(process.env.MONGODB_DB||"portfolio"); 
  await d.collection("categories").insertOne({ id: String(id).toLowerCase().replace(/\s+/g,"-"), label, position: position ? parseInt(position, 10) : 0 }); 
  
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/");
  return NextResponse.json({ ok: true }); 
}
