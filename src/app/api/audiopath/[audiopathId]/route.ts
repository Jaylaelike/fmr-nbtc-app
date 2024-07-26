/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { audioPaths } from "~/server/db/schema";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

interface contextProps {
  params: {
    audiopathId: number;
  };
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const post = await db.query.audioPaths.findMany({
      where: eq(audioPaths.id, params.audiopathId),
      with: {
        record: true,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
