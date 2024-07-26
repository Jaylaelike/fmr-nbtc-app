import db from "~/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.query.audioPaths.findMany({
      with: {
        record: true,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
