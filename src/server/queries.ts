import "server-only";
import db from "./db";
import { auth } from "@clerk/nextjs/server";

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
