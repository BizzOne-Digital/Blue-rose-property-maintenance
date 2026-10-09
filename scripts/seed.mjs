/**
 * Seeds MongoDB with service catalog + admin user.
 *
 * Usage:
 *   npm run db:seed
 *
 * Requires in .env.local:
 *   MONGODB_URI=...
 *   ADMIN_EMAIL=...
 *   ADMIN_PASSWORD=...
 */
import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import { randomBytes, scryptSync } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvFile(name) {
  const filePath = path.join(root, name);
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const uri = process.env.MONGODB_URI?.trim();
const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD?.trim();
const dbName = process.env.MONGODB_DB_NAME?.trim() || "blue_rose";

if (!uri) {
  console.error("Missing MONGODB_URI in .env.local");
  process.exit(1);
}
if (!adminEmail || !adminPassword) {
  console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local");
  process.exit(1);
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

const catalogPath = path.join(root, "data", "service-catalog.json");
if (!existsSync(catalogPath)) {
  console.error("Missing data/service-catalog.json");
  process.exit(1);
}

const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
catalog.updatedAt = new Date().toISOString();

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);

  await db.collection("catalog").updateOne(
    { _id: "main" },
    { $set: { data: catalog, updatedAt: new Date() } },
    { upsert: true }
  );
  console.log("✓ Service catalog seeded");

  const { salt, hash } = hashPassword(adminPassword);
  const now = new Date();
  await db.collection("admins").updateOne(
    { _id: "primary" },
    {
      $set: {
        email: adminEmail,
        passwordSalt: salt,
        passwordHash: hash,
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
  console.log(`✓ Admin user seeded: ${adminEmail}`);
  console.log(`  Database: ${dbName}`);
} finally {
  await client.close();
}
