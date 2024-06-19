// middleware.ts
import {
    clerkMiddleware,
    createRouteMatcher
  } from "@clerk/nextjs/server"
  
  const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/layout2", "/map", "/layout3", "/map/:path*"])
  
  export default clerkMiddleware((auth, request) => {
    if (isProtectedRoute(request)) auth().protect()
  })
  
  export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  }