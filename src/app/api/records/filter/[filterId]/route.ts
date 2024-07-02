import { records } from "~/server/db/schema";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { CreateRecord } from "~/server/data";

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
      });
  
      return NextResponse.json(post, { status: 200 });
    } catch {
      return NextResponse.json(
        { message: "could not get records" },
        { status: 500 },
      );
    }
  }
  
  