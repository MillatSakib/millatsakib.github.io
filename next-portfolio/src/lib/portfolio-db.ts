import { GridFSBucket, ObjectId } from "mongodb";
import getMongoClient from "@/lib/mongodb";
import { portfolioData, type Project, type SkillCategory, type SkillIconKey, type SkillTone } from "@/models/portfolioModel";

const dbName = process.env.MONGODB_DB || "portfolio";
export interface SkillDoc { _id?: ObjectId; name: string; level: number; iconKey: SkillIconKey; tone?: SkillTone; categoryId: string; }
export interface CategoryDoc { _id?: ObjectId; id: string; label: string; items?: SkillDoc[]; }
export interface ProjectDoc extends Omit<Project, "links"> { _id?: ObjectId; links: Project["links"]; imageFileId?: string; }
async function db() { return (await getMongoClient()).db(dbName); }
export async function getContent() {
  if (!process.env.MONGODB_URI) return { categories: portfolioData.skills, projects: portfolioData.projects };
  const d = await db();
  const categoryCount = await d.collection("categories").countDocuments();
  if (!categoryCount) {
    await d.collection("categories").insertMany(portfolioData.skills.map((c) => ({ id: c.id, label: c.label })));
    await d.collection("skills").insertMany(portfolioData.skills.flatMap((c) => c.items.map((s) => ({ ...s, categoryId: c.id }))));
  }
  if (!(await d.collection("projects").countDocuments())) await d.collection("projects").insertMany(portfolioData.projects);
  const categories = await d.collection<SkillCategory>("categories").find().sort({ position: 1, _id: 1 }).toArray();
  const skills = await d.collection<SkillDoc>("skills").find().sort({ position: 1, _id: 1 }).toArray();
  const projects = await d.collection<ProjectDoc>("projects").find().sort({ position: 1, _id: -1 }).toArray();
  return { categories: categories.map((c) => ({ id: c.id, label: c.label, items: skills.filter((s) => s.categoryId === c.id).map(({ categoryId: _categoryId, _id: _skillId, level = 0, ...s }) => ({ ...s, level })) })), projects: projects.map(({ _id: _projectId, ...p }) => p) };
}
export async function getProfileImage(): Promise<string | null> {
  if (!process.env.MONGODB_URI) return null;
  const d = await db();
  const doc = await d.collection("settings").findOne({ key: "profileImage" });
  return doc ? (doc.value as string) : null;
}
export async function setProfileImage(url: string): Promise<void> {
  const d = await db();
  await d.collection("settings").updateOne({ key: "profileImage" }, { $set: { value: url } }, { upsert: true });
}
export async function getAboutText(): Promise<string | null> {
  if (!process.env.MONGODB_URI) return null;
  const d = await db();
  const doc = await d.collection("settings").findOne({ key: "aboutText" });
  return doc ? (doc.value as string) : null;
}
export async function setAboutText(text: string): Promise<void> {
  const d = await db();
  await d.collection("settings").updateOne({ key: "aboutText" }, { $set: { value: text } }, { upsert: true });
}
export async function getCvUrl(): Promise<string | null> {
  if (!process.env.MONGODB_URI) return null;
  const d = await db();
  const doc = await d.collection("settings").findOne({ key: "cvUrl" });
  return doc ? (doc.value as string) : null;
}
export async function setCvUrl(url: string): Promise<void> {
  const d = await db();
  await d.collection("settings").updateOne({ key: "cvUrl" }, { $set: { value: url } }, { upsert: true });
}
export async function gridfs() { return new GridFSBucket(await db(), { bucketName: "portfolioMedia" }); }
export async function objectId(id: string) { return ObjectId.isValid(id) ? new ObjectId(id) : null; }
