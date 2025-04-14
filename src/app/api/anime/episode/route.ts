import { NextRequest, NextResponse } from 'next/server';
import FetchServiceInstance from '@/app/api';

export async function GET(req: NextRequest) {
  try {
    const title: string = req.nextUrl.searchParams.get('title') || '';

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}episode/get/${title}`);

    const response = await FetchServiceInstance.fetchHelper(url.toString(), {
      method: 'GET',
      chache: 'no-store',
    });

    const responseBody = NextResponse.json(response);

    return responseBody;
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
