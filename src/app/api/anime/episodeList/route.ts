import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const slug: string = req.nextUrl.searchParams.get('title') || 'none';

    if (slug === 'none') {
      NextResponse.json({ message: 'No slug provided' }, { status: 400 });
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}anime/${slug}/episodes`);

    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json({ message: `Failed to fetch anime list ${slug}` }, { status: response.status });
    }

    const responseBody = await response.json();
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
