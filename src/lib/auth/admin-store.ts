import { getDb, getMongoUri } from "@/lib/mongodb/client";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export const ADMIN_DOC_ID = "primary";

export interface AdminRecord {
  _id: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function findAdminByEmail(email: string): Promise<AdminRecord | null> {
  if (!getMongoUri()) return null;
  const db = await getDb();
  const doc = await db.collection<AdminRecord>("admins").findOne({
    email: email.toLowerCase().trim(),
  });
  return doc;
}

export async function findPrimaryAdmin(): Promise<AdminRecord | null> {
  if (!getMongoUri()) return null;
  const db = await getDb();
  return db.collection<AdminRecord>("admins").findOne({ _id: ADMIN_DOC_ID });
}

export async function upsertPrimaryAdmin(email: string, password: string): Promise<void> {
  const db = await getDb();
  const { salt, hash } = hashPassword(password);
  const now = new Date();
  await db.collection<AdminRecord>("admins").updateOne(
    { _id: ADMIN_DOC_ID },
    {
      $set: {
        email: email.toLowerCase().trim(),
        passwordSalt: salt,
        passwordHash: hash,
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
}

export async function verifyAdminLogin(email: string, password: string): Promise<boolean> {
  const admin = await findAdminByEmail(email);
  if (!admin) return false;
  return verifyPassword(password, admin.passwordSalt, admin.passwordHash);
}
