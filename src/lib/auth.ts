import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

// Read users from file
export function readUsers() {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
}

// Verify user credentials
export function verifyCredentials(usermail: string, password: string) {
    const users = readUsers();
    return users.find((user: userCredential) => user.usermail === usermail && user.password === password);
}

// Generate a JWT token
export function generateToken(payload: { usermail: string }) {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
}

// Verify a JWT token
export function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        console.log(error)
        return null;
    }
}
