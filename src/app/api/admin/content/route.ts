import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canEdit } from "@/lib/roles";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const texts = await db.siteText.findMany({ orderBy: [{ section: "asc" }, { key: "asc" }] });
  return NextResponse.json({ ok: true, texts });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!canEdit(session.role)) {
    return NextResponse.json({ ok: false, error: "forbidden", message: "Viewers cannot edit content. Ask an admin or editor." }, { status: 403 });
  }
  try {
    const body = await req.json();
    // body can be a single item { id, valueEn, valueAr } or array
    const items = Array.isArray(body) ? body : [body];
    for (const item of items) {
      if (item.id) {
        await db.siteText.update({
          where: { id: item.id },
          data: {
            valueEn: item.valueEn ?? undefined,
            valueAr: item.valueAr ?? undefined,
          },
        });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "update_failed", details: String(err) }, { status: 400 });
  }
}
