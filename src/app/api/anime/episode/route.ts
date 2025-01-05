import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const title: number = Number(req.nextUrl.searchParams.get('title')) || 0;

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}episode/get/${title}`);
    url.searchParams.append('slug', title.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to fetch anime list ${title.toString()}` },
        { status: response.status },
      );
    }

    const responseBody = NextResponse.json(await response.json());
    responseBody.headers.set('Access-Control-Allow-Origin', '*');
    responseBody.headers.set('Access-Control-Allow-Methods', 'GET');
    responseBody.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return responseBody;
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
