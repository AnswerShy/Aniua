import { NextResponse, NextRequest } from 'next/server';

export async function getCookieHeader(req: NextRequest) {
  const cookies = req.cookies;
  const sessionid = cookies.get('sessionid')?.value;

  if (!sessionid) {
    return NextResponse.json({ message: 'Missing required cookies' }, { status: 400 });
  }

  const cookieHeader = `sessionid=${sessionid}`;

  return cookieHeader;
}

export async function fetchWithCookieHeader(url: string, req: NextRequest, isTokenInHeader: boolean = false) {
  const cookieHeader = await getCookieHeader(req);
  if (cookieHeader instanceof NextResponse) {
    return cookieHeader;
  }

  const fetchUrl = new URL(url);
  const sessionid = cookieHeader.split('=')[1];
  if (isTokenInHeader) fetchUrl.searchParams.append('token', sessionid);

  const response = await fetch(fetchUrl.toString(), {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: response.status });
  }

  const responseBody = await response.json();
  return responseBody;
}
