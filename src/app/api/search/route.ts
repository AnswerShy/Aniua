import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = await req.nextUrl.searchParams.get('q');
    if (!query) return NextResponse.json({ message: `No query` });

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}search/?q=${query}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      cache: 'no-cache',
    });

    if (!response.ok) {
      return NextResponse.json({ message: `Failed to fetch anime ${query}` }, { status: response.status });
    }

    const { titles }: { titles: AnimeDataInterface[] } = await response.json();

    if (titles.length < 1) {
      return NextResponse.json({ message: 'No results found' }, { status: 404 });
    }

    return NextResponse.json(titles);
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
