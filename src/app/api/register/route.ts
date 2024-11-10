import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { readUsers } from '@/lib/auth';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function POST(request: Request) {
    const { usermail, password } = await request.json();
    const users = readUsers();

    // Check if usermail already exists
    if (users.some((user: userCredential) => user.usermail === usermail)) {
        return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Add new user
    users.push({ usermail, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User registered successfully' });
}
