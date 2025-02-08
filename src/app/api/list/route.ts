import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const page: number = Number(req.nextUrl.searchParams.get('page')) || 0;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}filter/?page=${page}&limit=18`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const finalRes = await res.json();

    return NextResponse.json(finalRes.titles);
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
