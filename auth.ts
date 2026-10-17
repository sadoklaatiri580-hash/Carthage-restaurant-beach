import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "cb_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "carthage-beach-hammam-sousse-secret";
}

/* ----------------------------- password hash ----------------------------- */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}

/* ------------------------------- sessions -------------------------------- */
export type SessionPayload = {
  userId: number;
  email: string;
  name: string;
  role: string;
  exp: number;
};

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("hex");
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">): string {
  const full: SessionPayload = { ...payload, exp: Date.now() + SESSION_TTL_MS };
  const body = Buffer.from(JSON.stringify(full)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  if (expected.length !== signature.length) return null;
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  return readSessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export const DEFAULT_ADMIN_EMAIL = "admin@carthagebeach.tn";
export const DEFAULT_ADMIN_PASSWORD = "carthage2024";
