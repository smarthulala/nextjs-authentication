'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { verify } from 'crypto'

export default function VerifyEmail() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')

  const onVerify = async () => {
    try {
      const response = await axios.post('/api/users/verifyemail', { token })
      setEmail(response.data.email)
      return response
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      onVerify()
    }
  }, [token])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 text-2xl'>
      <div className='text-4xl'>Your email: {email} is verified</div>

      <Link
        href='/login'
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600 text-center'
      >
        Log in Page
      </Link>
    </main>
  )
}
