import db from "../../../../server/db";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { records } from "../../../../server/db/schema";

import { CreateRecord } from "~/server/data";

import { uuidv7 } from "uuidv7";

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

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const recordindIds = uuidv7();
  const requestData: CreateRecord = await req.json();
  try {
    const user = auth();
    if (!user.userId) throw new Error("Not authenticated");

    const currentUsers = await currentUser();

    const record = await db.insert(records).values({
      stationId: requestData.stationId,
      recordIds: recordindIds,
      ipAddress: requestData.ipAddress,
      startTime: new Date(
        new Date(requestData.startTime).getTime() + 7 * 60 * 60 * 1000,
      ),
      endTime: new Date(
        new Date(requestData.endTime).getTime() + 7 * 60 * 60 * 1000,
      ),
      dayofweek: requestData.dayofweek,
      dailyStartTime: requestData.dailyStartTime,
      dailyEndTime: requestData.dailyEndTime,
      frequncy: requestData.frequncy,
      channel: requestData.channel,
      bitrates: requestData.bitrates,
      userId: user?.userId,
      username: currentUsers?.fullName ?? currentUsers?.username,
    });

    // //new Channel convert from "FM 1" to "FM1"
    // const newChnnels = requestData.channel;
    // const newChannel = newChnnels.replace(" ", "");
    // //rename file from `Tue Jul 23 2024 17:45:00 GMT+0700 (Indochina Time).wav`  to `Tue Jul 23 2024 17:45.wav`
    // const fileName = `${new Date(new Date(requestData.endTime).getTime() + 0 * 60 * 60 * 1000).toString().slice(0, 21)}.wav`;
    // // //rename new fileName from `Tue Jul 23 2024 17:45.wav` to `Tue_Jul_23_2024_17_45.wav`
    // const newFileName = fileName.replace(/ /g, "_");
    // // Insert the audio path into the audioPaths table
    // await db.insert(audioPaths).values({
    //   recordId: recordindIds,
    //   stationIds: requestData.stationId,
    //   frequencies: requestData.frequncy,
    //   startTime: new Date(
    //     new Date(requestData.startTime).getTime() + 7 * 60 * 60 * 1000,
    //   ),
    //   endTime: new Date(
    //     new Date(requestData.startTime).getTime() + 7 * 60 * 60 * 1000,
    //   ),
    //   urls:
    //     `https://tisxquhwharbxlrwzycc.supabase.co/storage/v1/object/public/songs/${newChannel}/` +
    //     newFileName,
    // });

    // // Create a new cron job
    // const cronJob = {
    //   job: {
    //     url: `https://a647-58-97-53-103.ngrok-free.app/upload/${newChannel}`,
    //     enabled: "true",
    //     saveResponses: true,
    //     schedule: {
    //       timezone: "Asia/Bangkok",
    //       expiresAt: 0,
    //       hours: [new Date(requestData.endTime).getHours()],
    //       mdays: [new Date(requestData.endTime).getDate()],
    //       minutes: [new Date(requestData.endTime).getMinutes()],
    //       months: [new Date(requestData.endTime).getMonth() + 1],
    //       wdays: [-1],
    //     },
    //   },
    // };

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   "Authorization",
    //   "Bearer wuIDjikw5BULwgfArdimegbcMIoJixOBrVVqhXHD2c8=",
    // );

    // const requestOptions = {
    //   method: "PUT",
    //   headers: myHeaders,
    //   body: JSON.stringify(cronJob),
    // };

    // await fetch("https://api.cron-job.org/jobs", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));

    // try {
    //   const ws = new WebSocket("ws://192.168.185.85:3000/Record");

    //   ws.on("open", function open() {
    //     // Send a message when the connection is opened
    //     ws.send("record"); // Sending a simple "record" message, adjust as needed
    //     ws.close(); // Optionally close the connection if it's no longer needed
    //   });
    // } catch (error) {
    //   console.error("WebSocket connection error:", error);
    // }

    // Call the function to establish a WebSocket connection
    await establishWebSocketConnection();

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.error(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
