import { NextRequest, NextResponse } from 'next/server';
import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';

export async function GET(req: NextRequest) {
  try {
    const title: string = req.nextUrl.searchParams.get('title') || '';

    const response = await FetchServiceInstance.fetchHelper(
      animeAPIConstant.episodeByTitle(title),
      {
        to: 'out',
        method: 'GET',
        chache: 'no-store',
        requestReturn: true,
      },
    );

    const responseBody = await response.json();

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
