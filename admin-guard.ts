import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getSession, type SessionPayload } from "@/lib/auth";

export async function requirePageAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function requireApiAdmin(): Promise<
  { ok: true; session: SessionPayload } | { ok: false; response: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Non autorisé." }, { status: 401 }),
    };
  }
  return { ok: true, session };
}
