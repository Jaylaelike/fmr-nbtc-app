"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wBqcECow3vP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
// import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

// import { Query } from "@tanstack/react-query";

// import { auth } from "@clerk/nextjs/server";

// import db from "~/server/db";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Users } from "~/server/data";

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClipboardPenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M10.4 12.6a2 2 0 0 1 3 3L8 21l-4 1 1-4Z" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
      <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function DeleteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function FileTypeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M9 13v-1h6v1" />
      <path d="M12 12v6" />
      <path d="M11 18h2" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// const { userId } = auth();

// // roleUser  and clear cachae of roleUser

// const roleUser = await getRoleUser(userId ?? "");

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // console.log(userId);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["data", userId],
    // refetchInterval: 5000,
    refetchOnWindowFocus: true,
    retryOnMount: true,
    refetchOnReconnect: true,
    queryFn: async () => {
      const res = await axios.get("/api/users");
      // console.log(res);

      return res;
    },
  });

  // this data Shapes
  // [
  //   {
  //   id: 1,
  //   userId: "user_2j909TyQV0dg8y1zHNfpw1fezOm",
  //   name: "sittichai",
  //   createdAt: "2024-07-12T18:30:35.000Z",
  //   updatedAt: "2024-07-26T17:25:44.000Z",
  //   role: "Admin",
  //   email: "smarkwisai@gmail.com"
  //   },
  //   {
  //   id: 4,
  //   userId: "user_2jmMV0OSUICmt3YAtWWpoXxbhhS",
  //   name: "sittichaio",
  //   createdAt: "2024-07-26T16:57:00.000Z",
  //   updatedAt: "2024-07-26T17:23:28.000Z",
  //   role: "user",
  //   email: "s55122509004@ssru.ac.th"
  //   }
  //   ]

  // console.log(data?.data);

  const roleUser: Users = data?.data.find((user) => user.userId === userId);

  return (
    <>
      {roleUser?.role === "Admin" && (
        <>
          <div className="space-y-4 p-4 pt-20">
            <div className="space-y-8 p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="flex items-center justify-between p-4">
                  <div>
                    <CardTitle>All Leave Requests</CardTitle>
                    <div className="text-2xl font-bold">

                 
                   
                      {data?.data.length}
                    </div>
                  </div>
                  <UserIcon className="h-12 w-12" />
                </Card>

                <Card className="flex items-center justify-between p-4">
                  <div>
                    <CardTitle>Leave Balance</CardTitle>
                  </div>
                  <CalendarIcon className="h-12 w-12" />
                </Card>
                <Card className="flex items-center justify-between p-4">
                  <div>
                    <CardTitle>Leave Types</CardTitle>
                  </div>
                  <FileTypeIcon className="h-12 w-12" />
                </Card>
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <div className="flex items-center justify-between pb-4">
                  <h2 className="text-lg font-semibold">All Leave Requests</h2>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8"
                    />
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>id</TableHead>
                      <TableHead>userId</TableHead>
                      <TableHead>name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>createdAt</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {data?.data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.userId}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              row.role === "user"
                                ? "default"
                                : row.role === "Admin"
                                  ? "destructive"
                                  : "warning"
                            }
                          >
                            {row.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <ClipboardPenIcon className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <DeleteIcon className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}

      {isLoading ? (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b pt-10">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <span className="loading loading-lg"></span>;
          </div>
        </div>
      ) : (
        <>
          {roleUser?.role !== "Admin" && (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b pt-10">
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-balance text-5xl font-extrabold tracking-tight text-gray-800 sm:text-[5rem]">
                  คุณไม่ใช่ Admin กรุณา{" "}
                  <span className="text-balance text-[hsl(353,93%,58%)]">
                    ติดต่อเจ้าหน้าที่
                  </span>
                </h1>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default page;
