import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

export function getMongoUri(): string | undefined {
  return uri?.trim() || undefined;
}

export function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }
  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const dbName = process.env.MONGODB_DB_NAME?.trim() || "blue_rose";
  const client = await getMongoClient();
  return client.db(dbName);
}
