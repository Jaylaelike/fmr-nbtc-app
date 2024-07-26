import { SignedIn, SignedOut } from "@clerk/nextjs";

import { db } from "../server/db";

import { auth, currentUser } from "@clerk/nextjs/server";
import { users } from "../server/db/schema";
import { redirect } from "next/navigation";
import CardHoverPage from "~/component/card-hover-page";

export default async function HomePage() {

  const usersAuth = auth();

  //check createUser function  if user not found in the database  then create user

  if (usersAuth) {
    const currentUsers = await currentUser();
    const existingMessages = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.userId, currentUsers?.id ?? ""),
    });
    console.log("existingMessages", existingMessages);
    console.log("currentUsers", currentUsers);

    if (!existingMessages && currentUsers) {
      await db.insert(users).values({
        userId: currentUsers?.id ?? "",
        name: currentUsers?.username,
        role: "user",
        email: currentUsers?.emailAddresses[0]?.emailAddress,
      });
      redirect("/");  
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b pt-10">
        <SignedOut>
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 sm:text-[5rem]">
              กรุณา <span className="text-[hsl(353,93%,58%)]">เข้าสู่ระบบ</span> ก่อนใช้งาน
            </h1>
          </div>
        </SignedOut>

        <SignedIn>
          {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Welcome{" "}
              <span className="text-[hsl(280,100%,70%)]">
               Name: {existingMessages?.name ?? "Not Found User"}
              </span>{" "}
            <br />
             Role: {existingMessages?.role ?? "Not Found Role"}
             <br />
              Email: {existingMessages?.email ?? "Not Found Email"}
            </h1>
          </div> */}

          <CardHoverPage />
        </SignedIn>
      </main>
    );
  }
}
