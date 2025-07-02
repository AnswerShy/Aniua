import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}filter/?${params}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const finalRes = await res.json();

    return NextResponse.json({ ...finalRes });
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
