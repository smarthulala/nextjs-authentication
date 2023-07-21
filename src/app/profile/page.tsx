'use client'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState('Nothing')
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    try {
      axios.get('/api/users/logout')
      console.log('Logout successfully')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const getUserDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users/me')
      console.log(response.data)
      setData(response.data.data._id)
    } catch (error: any) {
      console.log('Error fetching user data', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <h1>{loading ? 'Processing' : 'Profile'}</h1>
      <hr />
      <p className='text-5xl'>Profile Page</p>
      <h2>
        {data === 'Nothing' ? (
          'Nothing'
        ) : (
          <Link
            className='rounded text-black bg-orange-500 p-2'
            href={`/profile/${data}`}
          >
            {data}
          </Link>
        )}
      </h2>
      <button
        onClick={getUserDetails}
        className='p-2 focus:outline-none bg-blue-600 border rounded-lg text-center'
      >
        User details
      </button>
      <button
        onClick={logout}
        className='p-2 focus:outline-none bg-gray-600 border rounded-lg text-center'
      >
        <Link href='/login'>Sign out</Link>
      </button>
    </div>
  )
}
