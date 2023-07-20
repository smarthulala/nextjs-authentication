'use client'
import Link from 'next/link'

export default function page() {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <h1>Profile</h1>
      <hr />
      <p className='text-5xl'>Profile Page</p>
      <button className='p-2 focus:outline-none bg-gray-600 border rounded-lg text-center'>
        <Link href='/signup'>Sign out</Link>
      </button>
    </div>
  )
}
