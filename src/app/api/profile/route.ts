import { NextRequest, NextResponse } from 'next/server';
import { fetchWithCookieHeader } from '@/utils/customUtils';

export async function GET(req: NextRequest) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}user/`;
    const response = await fetchWithCookieHeader(url, req);
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
