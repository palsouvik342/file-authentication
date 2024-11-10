import { NextResponse } from 'next/server';
import { verifyCredentials, generateToken } from '@/lib/auth';
import { serialize } from 'cookie';

export async function POST(request: Request) {
    const { usermail, password } = await request.json() as userCredential;
    const user = verifyCredentials(usermail, password);

    if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = generateToken({ usermail });

    // Set token in a cookie
    const cookie = serialize('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60,
        path: '/',
    });

    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.set('Set-Cookie', cookie);

    return response;
}
