import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password1, password2 } = await req.json();

    const formData = new URLSearchParams({
      username,
      email,
      password1,
      password2,
    });

    console.log(formData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}register/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'registration failed' },
        { status: response.status },
      );
    }

    const setCookieHeader = response.headers.get('set-cookie');

    if (setCookieHeader) {
      const nextResponse = NextResponse.json(await response.json());
      nextResponse.headers.set('Set-Cookie', setCookieHeader);
      return nextResponse;
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error('Error in register handler:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
