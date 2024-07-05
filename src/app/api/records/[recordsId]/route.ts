/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { records } from "~/server/db/schema";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { CreateRecord } from "~/server/data";


interface contextProps {
  params: {
    recordsId: number;
  };
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    await db.delete(records).where(eq(records.id, params.recordsId));

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "could not delete post" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, context: contextProps) {
  try {
    const { params } = context;

    const body: CreateRecord = await req.json();

    await db
      .update(records)
      .set({
        stationId: body.stationId,
        ipAddress: body.ipAddress,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        frequncy: body.frequncy,
        dayofweek: body.dayofweek,
        channel: body.channel,
        dailyStartTime: body.dailyStartTime,
        dailyEndTime: body.dailyEndTime,
      })
      .where(eq(records.id, params.recordsId));

    return NextResponse.json(
      { message: `update id ${params.recordsId} success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "could not update post" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const post = await db.query.records.findMany({
      where: eq(records.id, params.recordsId),
    });

    return NextResponse.json(post, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}

