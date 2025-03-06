// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ['/reportmaster/:path*', '/user/:path*', '/role/:path*', '/live-streaming', '/dashboard', '/search', '/sign-in', '/sign-up', '/:path*', '/logout', '/'],
// };

// export async function middleware(req) {

//    console.log("working middleware")

//   const cookieStore = cookies();
//   const sessionToken = cookieStore.get('next-auth.session-token')?.value;

//   // Example: Logging the session token
//   console.log('Session Token:', sessionToken);

//   if (sessionToken && req.nextUrl.pathname === '/sign-in') {
//     return NextResponse.redirect(new URL('/user/profile', req.url));
//   }
//   if (!sessionToken && (
//     req.nextUrl.pathname === ("/") ||
//     req.nextUrl.pathname === ("/admin-panel") ||
//     req.nextUrl.pathname.startsWith("/dashboard") ||
//     req.nextUrl.pathname.startsWith("/live-streaming") ||
//     req.nextUrl.pathname.startsWith("/user") ||
//     req.nextUrl.pathname.startsWith("/role") ||
//     req.nextUrl.pathname.startsWith("/audits-logs") ||
//     req.nextUrl.pathname.startsWith("/session-logs") ||
//     req.nextUrl.pathname.startsWith("/client") ||
//     req.nextUrl.pathname.startsWith("/device") ||
//     req.nextUrl.pathname.startsWith("/event") ||
//     req.nextUrl.pathname.startsWith("/location") ||
//     req.nextUrl.pathname.startsWith("/objectes") ||
//     req.nextUrl.pathname.startsWith("/objectType") ||
//     req.nextUrl.pathname.startsWith("/objectes") ||
//     req.nextUrl.pathname.startsWith("/reportdetail") ||
//     req.nextUrl.pathname.startsWith("/report-template") ||
//     req.nextUrl.pathname.startsWith("/reportmaster") ||
//     req.nextUrl.pathname.startsWith("/zone") ||
//     req.nextUrl.pathname.startsWith("/logs") ||
//     req.nextUrl.pathname.startsWith("/occupancy-event") ||
//     req.nextUrl.pathname.startsWith("/occupancy-threshold") ||
//     req.nextUrl.pathname.startsWith("/occupancy") ||
//     req.nextUrl.pathname.startsWith("/notification") ||
//     req.nextUrl.pathname.startsWith("/unit")

//   )) {
//     return NextResponse.redirect(new URL('/sign-in', req.url));
//   }


//   return NextResponse.next();
// }
