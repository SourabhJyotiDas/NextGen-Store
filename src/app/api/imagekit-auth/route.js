// app/api/imagekit-auth/route.ts
import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters(); // { token, signature, expire }
    return NextResponse.json(authParams); // ✅ should return all 3 keys
  } catch (error) {
    return NextResponse.json(
      { message: "ImageKit auth failed" },
      { status: 500 }
    );
  }
}
