import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const title: number = Number(req.nextUrl.searchParams.get("title")) || 0;

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}episode/get/${title}`);
    url.searchParams.append("slug", title.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: `Failed to fetch anime list ${title.toString()}` }, { status: response.status });
    }

    const responseBody = await response.json();
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
