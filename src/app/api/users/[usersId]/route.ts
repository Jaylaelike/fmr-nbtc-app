/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { users } from "~/server/db/schema";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Users } from "~/server/data";

import { clerkClient } from "@clerk/nextjs/server";

interface contextProps {
  params: {
    usersId: number;
  };
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;

    await db.delete(users).where(eq(users.id, params.usersId));

    //get userId from the database
    const user = await db.query.users.findMany({
      where: eq(users.id, params.usersId),
    });

    console.log(user?.userId);
    

    try {
      await clerkClient.users.deleteUser(user?.userId || "");
      return NextResponse.json({ message: "User deleted" });
    } catch (error) {
      return NextResponse.json({
        message: "User deleted from database but not from Clerk",
      });
    }

    // return new Response(null, { status: 204 });
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

    const body: Users = await req.json();

    await db
      .update(users)
      .set({
        userId: body.userId,
        name: body.name,
        role: body.role,
        email: body.email,
      })
      .where(eq(users.id, params.usersId));

    return NextResponse.json(
      { message: `update id ${params.usersId} success` },
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
    const post = await db.query.users.findMany({
      where: eq(users.id, params.usersId),
    });

    return NextResponse.json(post, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "could not get records" },
      { status: 500 },
    );
  }
}
