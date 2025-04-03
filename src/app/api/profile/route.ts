import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const sessionid = req.cookies.get('sessionid')?.value;
    if (!sessionid) return NextResponse.json({ message: 'Missing sessionid cookie' }, { status: 400 });

    const url = `${process.env.NEXT_PUBLIC_API_URL}user/`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        cookie: `sessionid=${sessionid}`,
      },
    });

    const responseData = await response.json();

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
