'use client'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleClick = async () => {
    try {
      setLoading(true)
      await axios.post('/api/users/forgotpassword', { email })
      console.log('Email send successfully')
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 text-2xl'>
      <div className='text-4xl'>
        {loading ? 'Processing' : 'Forgot Password'}
      </div>
      <label htmlFor='password'>Please enter your email</label>
      <input
        type='text'
        placeholder='email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className='rounded text-black p-2 focus:outline-none w-[300px]'
      />
      <button
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600 text-center disabled:bg-gray-500'
        onClick={handleClick}
      >
        Send
      </button>
      <Link
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600'
        href='/login'
      >
        Go to Login
      </Link>
    </main>
  )
}
