import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { portfolioData } from "@/models/portfolioModel";
import { requireAdmin } from "@/lib/auth";
import { getProfileImage, setProfileImage, getAboutText, setAboutText, getCvUrl, setCvUrl } from "@/lib/portfolio-db";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [url, aboutText, cvUrl] = await Promise.all([getProfileImage(), getAboutText(), getCvUrl()]);
  return NextResponse.json({ url, aboutText: aboutText ?? portfolioData.about.description, cvUrl: cvUrl ?? portfolioData.hero.resumeUrl });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  
  if (body.url !== undefined) {
    await setProfileImage(body.url);
  }
  if (body.aboutText !== undefined) {
    await setAboutText(body.aboutText);
  }
  if (body.cvUrl !== undefined) {
    await setCvUrl(body.cvUrl);
  }
  
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
