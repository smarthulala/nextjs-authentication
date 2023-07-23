'use client'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Profile() {
  const router = useRouter()
  const [data, setData] = useState('')

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')

      router.push('/login')
    } catch (error: any) {
      console.log('logout failed', error.message)
    }
  }

  const getUserDetails = async () => {
    const response = await axios.get('/api/users/me')
    setData(response.data.data._id)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 text-2xl'>
      <div className='text-4xl'>Profile Page</div>
      <div>
        {!data ? (
          <div>Hello there</div>
        ) : (
          <Link
            href={`/profile/${data}`}
            className='bg-orange-500 p-2 rounded text-black'
          >
            {data}
          </Link>
        )}
      </div>
      <button
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600 text-center disabled:bg-gray-500'
        onClick={getUserDetails}
      >
        Get user details
      </button>
      <button
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600 text-center disabled:bg-gray-500'
        onClick={logout}
      >
        Log out
      </button>
      <Link
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600'
        href='/'
      >
        Go to Home Page
      </Link>
    </main>
  )
}
