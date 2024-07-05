import { records } from "~/server/db/schema";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

interface contextProps {
  params: {
    filterId: number;
  };
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const post = await db.query.records.findMany({
      where: eq(records.stationId, params.filterId),
      orderBy: [desc(records.id)],
    });

    return NextResponse.json(post, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
