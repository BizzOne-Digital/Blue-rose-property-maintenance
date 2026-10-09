import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LEN = 64;

export function hashPassword(password: string, salt?: string): { salt: string; hash: string } {
  const s = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, s, KEY_LEN).toString("hex");
  return { salt: s, hash };
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  try {
    const derived = scryptSync(password, salt, KEY_LEN).toString("hex");
    const a = Buffer.from(derived, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
