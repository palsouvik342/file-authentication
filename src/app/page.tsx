import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default function Home() {
  const token = cookies().get('token')?.value;

  if (!token || !verifyToken(token)) {
    return (
      <div className='h-screen w-full bg-gray-50 flex justify-center items-center'>
        <div className=' px-20 py-10 bg-white inline-block text-center'>
          <p>Access denied. Please log in.</p>
          <Link className='text-blue-500 font-bold underline' href="/login">Log in</Link>
        </div>
      </div>
    )
  }

  return <p>Welcome to the Dashboard!</p>;
}
