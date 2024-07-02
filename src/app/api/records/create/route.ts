"user server";
import db from "../../../../server/db";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { records } from "../../../../server/db/schema";

import { CreateRecord } from "~/server/data";


export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const requestData: CreateRecord = await req.json();
  try {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const currentUsers = await currentUser();

    const record = await db.insert(records).values({
      stationId: requestData.stationId,
      ipAddress: requestData.ipAddress,
      startTime: new Date(requestData.startTime),
      endTime: new Date(requestData.endTime),
      dayofweek: requestData.dayofweek,
      dailyStartTime: requestData.dailyStartTime,
      dailyEndTime: requestData.dailyEndTime,
      frequncy: requestData.frequncy,
      userId: user?.userId,
      username: currentUsers?.fullName,
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.error(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
