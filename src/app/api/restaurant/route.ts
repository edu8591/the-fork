import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_URL as string;
  const email = process.env.USER_EMAIL as string;
  const token = process.env.TOKEN as string;
  console.log("url:", url);
  console.log("email:", email);
  console.log("token:", token);

  const body = await req.json();
  console.log("body:", body);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "X-User-Email": email,
        "X-User-Token": token,
      },
    });

    if (!response.ok) {
      throw new Error();
    }
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create Restaurant");
  }
}
