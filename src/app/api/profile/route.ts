import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const cookies = req.cookies;
        const authToken = cookies.get("authToken")?.value;
        const sessionid = cookies.get("sessionid")?.value;
        const csrftoken = cookies.get("csrftoken")?.value;

        if (!authToken || !sessionid || !csrftoken) {
            return NextResponse.json({ message: "Missing required cookies" }, { status: 400 });
        }

        const cookieHeader = `csrftoken=${csrftoken}; sessionid=${sessionid}`;

        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}user/`);
        url.searchParams.append("token", authToken);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Cookie: cookieHeader,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Failed to fetch data" }, { status: response.status });
        }

        const responseBody = await response.json();
        return NextResponse.json(responseBody);
    } catch (error) {
        console.error("Error in login handler:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
