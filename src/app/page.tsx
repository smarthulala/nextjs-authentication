'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 text-2xl'>
      <div className='text-4xl'>Hello World!</div>
      <Link
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600'
        href='/profile'
      >
        Go to profile
      </Link>
      <Link
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600'
        href='/login'
      >
        Go to Login
      </Link>
    </main>
  )
}
