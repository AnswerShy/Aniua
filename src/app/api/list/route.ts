import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}filter/?${params}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const finalRes = await res.json();

    // avoid api.aniua filter issue
    const uniqueTitlesMap = new Map<number, AnimeDataInterface>();
    for (const title of finalRes.titles) {
      if (!uniqueTitlesMap.has(title.id)) {
        uniqueTitlesMap.set(title.id, title);
      }
    }
    const uniqueTitles = Array.from(uniqueTitlesMap.values());

    return NextResponse.json({ ...finalRes, titles: uniqueTitles });
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
