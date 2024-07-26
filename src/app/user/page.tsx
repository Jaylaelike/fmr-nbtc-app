import React from 'react'

function page() {
  return (
    <div>
      <div className="p-4 space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="flex items-center justify-between p-4">
          <div>
            <CardTitle>All Leave Requests</CardTitle>
            <div className="text-2xl font-bold">18</div>
          </div>
          <UserIcon className="w-12 h-12" />
        </Card>
        
        <Card className="flex items-center justify-between p-4">
          <div>
            <CardTitle>Leave Balance</CardTitle>
          </div>
          <CalendarIcon className="w-12 h-12" />
        </Card>
        <Card className="flex items-center justify-between p-4">
          <div>
            <CardTitle>Leave Types</CardTitle>
          </div>
          <FileTypeIcon className="w-12 h-12" />
        </Card>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold">All Leave Requests</h2>
          <div className="relative">
            <Input type="search" placeholder="Search..." className="pl-8" />
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Leave From</TableHead>
              <TableHead>Leave To</TableHead>
              <TableHead>No Of Days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                name: "Jahan Mohammad",
                type: "Casual Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Approved",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Md. Jahidul Islam",
                type: "Casual Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Rejected",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Md. Touhidul Hoque",
                type: "Casual Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Pending",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Jubair Ahmed",
                type: "Casual Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Approved",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Sakib Al Hasan",
                type: "Maternity Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Rejected",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Raisul Islam Rifat",
                type: "Maternity Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Pending",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Fahimul Haque",
                type: "Medical Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Approved",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Rashedul Roni",
                type: "Medical Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Rejected",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
              {
                name: "Mushfiqul Haque",
                type: "Medical Leave",
                from: "04/06/2023",
                to: "12/06/2023",
                days: 9,
                status: "Pending",
                reason: "Sick",
                img: "/placeholder.svg?height=40&width=40",
              },
            ].map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{row.name[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.from}</TableCell>
                <TableCell>{row.to}</TableCell>
                <TableCell>{row.days}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.status === "Approved" ? "default" : row.status === "Rejected" ? "destructive" : "warning"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <ClipboardPenIcon className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <DeleteIcon className="w-4 h-4 text-muted-foreground" />
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
  )
}

export default page


// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/wBqcECow3vP
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Card, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//   return (
   
//   )
// }

// function CalendarIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M8 2v4" />
//       <path d="M16 2v4" />
//       <rect width="18" height="18" x="3" y="4" rx="2" />
//       <path d="M3 10h18" />
//     </svg>
//   )
// }


// function ClipboardPenIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="8" height="4" x="8" y="2" rx="1" />
//       <path d="M10.4 12.6a2 2 0 0 1 3 3L8 21l-4 1 1-4Z" />
//       <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
//       <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
//     </svg>
//   )
// }


// function DeleteIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
//       <line x1="18" x2="12" y1="9" y2="15" />
//       <line x1="12" x2="18" y1="9" y2="15" />
//     </svg>
//   )
// }


// function FileTypeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
//       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//       <path d="M9 13v-1h6v1" />
//       <path d="M12 12v6" />
//       <path d="M11 18h2" />
//     </svg>
//   )
// }


// function SearchIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   )
// }


// function UserIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   )
// }


// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }