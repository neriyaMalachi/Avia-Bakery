import { cookies } from "next/headers"; // ייבוא cookies
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken");
  if (token) {
    return NextResponse.json(token);
  } else {
    return NextResponse.json("Failed to fetch token");
  }
}