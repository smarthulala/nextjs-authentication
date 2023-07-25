'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function Signup() {
  const router = useRouter()
  const [buttonDisable, setButtonDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })

  const onSignup = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/signup', user)
      console.log('Sign up successful', response.data)

      router.push('/login')
    } catch (error: any) {
      console.log('failed fetching signup api', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }, [user])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 text-2xl'>
      <div className='text-4xl'>{loading ? 'Processing' : 'Signup'}</div>
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        placeholder='Email'
        value={user.email}
        onChange={(event) => setUser({ ...user, email: event.target.value })}
        className='rounded text-black p-2 focus:outline-none w-[300px]'
      />
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        placeholder='username'
        value={user.username}
        onChange={(event) => setUser({ ...user, username: event.target.value })}
        className='rounded text-black p-2 focus:outline-none w-[300px]'
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        placeholder='password'
        value={user.password}
        onChange={(event) => setUser({ ...user, password: event.target.value })}
        className='rounded text-black p-2 focus:outline-none w-[300px]'
      />
      <div className='flex justify-between w-[300px] my-8'>
        <button
          className='p-2 rounded border active:bg-green-600 hover:bg-green-600 text-center disabled:bg-gray-500'
          onClick={onSignup}
          disabled={buttonDisable}
        >
          Signup
        </button>
        <Link
          href='/login'
          className='p-2 rounded border active:bg-green-600 hover:bg-green-600 text-center'
        >
          Login Page
        </Link>
      </div>
      <Link
        className='p-2 rounded border active:bg-green-600 hover:bg-green-600'
        href='/'
      >
        Go to Home
      </Link>
    </main>
  )
}
