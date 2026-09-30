import { Readable } from "node:stream";
import { NextResponse } from "next/server"; import { gridfs, objectId } from "@/lib/portfolio-db";
export const runtime = "nodejs";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) { const id=await objectId((await params).id); if(!id) return new NextResponse("Not found",{status:404}); const bucket=await gridfs(); const files=await bucket.find({_id:id}).toArray(); if(!files[0]) return new NextResponse("Not found",{status:404}); const stream=bucket.openDownloadStream(id); return new Response(Readable.toWeb(stream) as ReadableStream, { headers:{"Content-Type":files[0].metadata?.contentType||"application/octet-stream","Cache-Control":"public, max-age=31536000, immutable"} }); }
