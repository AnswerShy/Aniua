import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }){
  try {
    const { slug } = params;
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}anime/${slug}`);
    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: `Failed to fetch anime ${slug}` }, { status: response.status });
    }

    const responseBody = await response.json();
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
