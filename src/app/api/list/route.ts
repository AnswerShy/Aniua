import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}filter/`);
        
        searchParams.forEach((value, key) => {
            url.searchParams.append(key, value);
        });

        const response = await fetch(url.toString(), {
            method: "GET",
            cache: "force-cache",
            next: {
                revalidate: 3600,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ message: `Failed to fetch anime list`  }, { status: response.status });
        }

        const responseBody = await response.json();
        return NextResponse.json(responseBody.titles);
    } catch (error) {
        console.error("Error in login handler:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
