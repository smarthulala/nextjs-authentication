'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ForgotPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [matchPassword, setMatchPassword] = useState(false)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      console.log(token, password)
      await axios.post('/api/users/updatepassword', { token, password })
      console.log('Update password successful')
    } catch (error: any) {
      console.log('error in fetching updatepassword api', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    if (urlToken) {
      setToken(urlToken || '')
    }
  }, [])

  useEffect(() => {
    if (password.length && password === confirmPassword) {
      setMatchPassword(true)
    } else {
      setMatchPassword(false)
    }
  }, [password, confirmPassword])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-8 text-2xl'>
      <div className='text-4xl'>Forgot Password</div>
      <label htmlFor='password'>New Password</label>
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className='rounded text-black p-2 focus:outline-none w-[300px]'
      />
      <label htmlFor='confirmpassword'>Confirm Password</label>
      <input
        type='password'
        placeholder='confirmpassword'
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        className='rounded text-black p-2 focus:outline-none w-[300px]'
      />
      <button
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600 text-center disabled:bg-gray-500'
        onClick={handleClick}
        disabled={!matchPassword}
      >
        Confirm
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
