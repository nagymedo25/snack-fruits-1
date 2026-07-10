import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-session";
import { canCreate } from "@/lib/roles";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const products = await db.product.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ ok: true, products });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!canCreate(session.role)) {
    return NextResponse.json({ ok: false, error: "forbidden", message: "Viewers cannot create products. Contact an admin or editor." }, { status: 403 });
  }
  try {
    const body = await req.json();
    const product = await db.product.create({ data: body });
    return NextResponse.json({ ok: true, product });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "create_failed", details: String(err) },
      { status: 400 }
    );
  }
}
