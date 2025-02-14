import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { query: string } }) {
  try {
    const { query } = await params;

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}search/?q=${query}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: `Failed to fetch anime ${query}` }, { status: response.status });
    }

    const { titles }: { titles: AnimeDataInterface[] } = await response.json();

    const filteredResults = titles.filter((item) => {
      const titleEnMatch =
        typeof item.title_en === 'string' && item.title_en.toLowerCase().includes(query.toLowerCase());
      const titleUaMatch =
        typeof item.title === 'string' && item.title.toLowerCase().includes(query.toLowerCase());

      return titleEnMatch || titleUaMatch;
    });

    if (filteredResults.length > 0) {
      return NextResponse.json(filteredResults);
    }

    return NextResponse.json({ message: 'No results found' }, { status: 404 });
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
