import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { verifyAdminLogin } from "@/lib/auth/admin-store";

const COOKIE_NAME = "brpm_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getSessionSecret(): string {
  return (
    process.env.SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    ""
  );
}

export function createAdminSessionToken(): string {
  const secret = getSessionSecret();
  if (!secret) return "";
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_TTL_MS }),
    "utf8"
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getSessionSecret();
  if (!secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp: number;
    };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

function verifyEnvAdminPassword(password: string): boolean {
  const secret = process.env.ADMIN_PASSWORD?.trim() ?? "";
  if (!secret || password.length !== secret.length) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(secret));
  } catch {
    return false;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const normalizedEmail = email.toLowerCase().trim();
  const fromDb = await verifyAdminLogin(normalizedEmail, password);
  if (fromDb) return true;

  const envEmail =
    process.env.ADMIN_EMAIL?.trim().toLowerCase() || "admin@bluerose.local";
  if (normalizedEmail === envEmail && verifyEnvAdminPassword(password)) {
    return true;
  }
  return false;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminSessionToken(store.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME };
