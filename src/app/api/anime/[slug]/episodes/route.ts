import { NextRequest, NextResponse } from 'next/server';
import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;

    if (slug === 'none') {
      NextResponse.json({ message: 'No slug provided' }, { status: 400 });
    }

    const response = await FetchServiceInstance.fetchHelper(animeAPIConstant.episodeList(slug), {
      to: 'out',
      method: 'GET',
      chache: 'no-store',
      requestReturn: true,
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to fetch anime list ${slug}` },
        { status: response.status },
      );
    }

    const responseBody = await response.json();
    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
