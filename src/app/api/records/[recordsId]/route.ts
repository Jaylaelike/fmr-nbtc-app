/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { audioPaths, records } from "~/server/db/schema";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { CreateRecord } from "~/server/data";
import { auth, currentUser } from "@clerk/nextjs/server";

interface contextProps {
  params: {
    recordsId: number;
  };
}

// Separate function for establishing a WebSocket connection
async function establishWebSocketConnection() {
  try {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL + "Record");

    ws.on("open", function open() {
      ws.send("record");
      ws.close();
    });
  } catch (error) {
    console.error("WebSocket connection error:", error);
  }
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    await db.delete(records).where(eq(records.id, params.recordsId));

    // Establish a WebSocket connection
    // const ws = new WebSocket("ws://192.168.185.85:3000/Record");

    // try {
    //   ws.onopen = function open() {
    //     // Send an "update" message when the connection is opened
    //     ws.send("record");
    //     ws.close(); // Optionally close the connection if it's no longer needed
    //   };
    // } catch (error) {
    //   console.error(error);
    // }

    await establishWebSocketConnection();

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

    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");
    const currentUsers = await currentUser();

    await db
      .update(records)
      .set({
        stationId: body.stationId,
        ipAddress: body.ipAddress,
        startTime: new Date(
          new Date(body.startTime).getTime() + 7 * 60 * 60 * 1000,
          //  body.startTime
        ),
        endTime: new Date(
          new Date(body.endTime).getTime() + 7 * 60 * 60 * 1000,
          // body.endTime
        ),
        frequncy: body.frequncy,
        dayofweek: body.dayofweek,
        channel: body.channel,
        bitrates: body.bitrates,
        dailyStartTime: body.dailyStartTime,
        dailyEndTime: body.dailyEndTime,
        username: currentUsers?.fullName ?? currentUsers?.username ?? "",
      })
      .where(eq(records.id, params.recordsId));


 

    await establishWebSocketConnection();

    // try {
    //  const ws = new WebSocket("ws://192.168.185.85:3000/Record");
    //   ws.onopen = function open() {
    //     // Send an "update" message when the connection is opened
    //     ws.send("record");
    //     ws.close(); // Optionally close the connection if it's no longer needed
    //   };
    // } catch (error) {
    //   console.error(error);
    // }

    return NextResponse.json(
      { message: `update id ${params.recordsId} success` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "could not update post" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const post = await db.query.records.findMany({
      where: eq(records.id, params.recordsId),
      with: {
        audioPaths: true,
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
