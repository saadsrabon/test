import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(req) {
    const cookieHeader = req.headers.get('cookie');
    const cookies = cookieHeader ? parse(cookieHeader) : {};
    const token = cookies.accessToken;

    const { pathname } = req.nextUrl;

    // Allow access if token exists, or if the path is root or a Next.js internal path
    if (token || pathname === '/' || pathname.startsWith('/_next/')) {
        return NextResponse.next();
    }

    // Redirect to the home page if not authenticated
    return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
    matcher: ['/my-profile', '/edit-profile', '/profile/:path*', '/dashboard/post-activities'], // Apply middleware to these routes
};

// import { NextResponse } from 'next/server';
// import { parse } from 'cookie';

// export async function middleware(req) {
//     const cookieHeader = req.headers.get('cookie');
//     const cookies = cookieHeader ? parse(cookieHeader) : {};
//     const token = cookies.token;



//     const { pathname } = req.nextUrl;

//     if (token || pathname === '/' || pathname.startsWith('/_next/')) {
//         return NextResponse.next();
//     }

//     return NextResponse.redirect(new URL('/', req.url));
// }

// export const config = {
//     matcher: ['/my-profile', '/profile/:path*'],
// };
