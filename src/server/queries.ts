/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "server-only";
import db from "./db";
import { auth } from "@clerk/nextjs/server";
// import { records } from "./db/schema";


//Get Insert UserId and fullname from Clerk and insert into the database drizzle
export async function createUser() {
  const user = auth();
  if (!user.userId) {
    throw new Error("Not authenticated");
  }

  const userExists = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  return userExists;
}

// this schema
// id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
// stationId: bigint("stationId", { mode: "number" }).notNull(),
// ipAddress: varchar("ipAddress", { length: 256 }),
// startTime: datetime("startTime", { mode: "date", fsp: 6 }).notNull(),
// endTime: datetime("endTime", { mode: "date", fsp: 6 }).notNull(),
// frequncy: varchar("frequncy", { length: 256 }).notNull(),
// userId: varchar("userId", { length: 256 }).notNull(),
// username: varchar("name", { length: 256 }).notNull(),
// createdAt: timestamp("created_at")
//   .default(sql`CURRENT_TIMESTAMP`)
//   .notNull(),
// updatedAt: timestamp("updatedAt").onUpdateNow(),

//create new record
// export async function createRecord(data: {
//   stationId: number;
//   ipAddress: string;
//   startTime: string;
//   endTime: string;
//   frequncy: string;
// }) {
//   const user = auth();
//   if (!user.userId) {
//     throw new Error("Not authenticated");
//   }

//   const currentUsers = await currentUser();

//   const record = await db.insert(records).values({
//     stationId: data.stationId,
//     ipAddress: data.ipAddress,
//     startTime: data.startTime,
//     endTime: data.endTime,
//     frequncy: data.frequncy,
//     userId: user.userId,
//     username: currentUsers?.fullName,
//   });

//   return record;
// }
