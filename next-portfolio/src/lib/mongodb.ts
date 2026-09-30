import { MongoClient } from "mongodb";

declare global { var _mongoClientPromise: Promise<MongoClient> | undefined; }
export default function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing from .env");
  const client = new MongoClient(uri);
  if (process.env.NODE_ENV !== "production") {
    global._mongoClientPromise ??= client.connect();
    return global._mongoClientPromise;
  }
  return client.connect();
}
