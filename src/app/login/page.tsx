'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('login successfully', response.data)
      toast.success('login successfully')
      router.push('/profile')
    } catch (error: any) {
      console.log('Login failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <h1>{loading ? 'Processing' : 'Login'}</h1>
      <hr />
      <label htmlFor='email'>Email</label>
      <input
        className='p-2 focus:outline-none rounded text-black'
        type='text'
        id='email'
        placeholder='Email..'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor='password'>Password</label>
      <input
        className='p-2 focus:outline-none rounded text-black'
        type='text'
        id='password'
        placeholder='Password..'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className='p-2 focus:outline-none w-20 bg-emerald-600 border rounded-lg text-center'
        onClick={onLogin}
      >
        Login
      </button>
      <Link
        className='p-2 focus:outline-none w-20 bg-black border rounded-lg text-center'
        href='/forgotpassword'
      >
        Forgot your password?
      </Link>
      Do not have an account?
      <Link
        className='p-2 focus:outline-none w-20 bg-black border rounded-lg text-center'
        href='/signup'
      >
        Signup
      </Link>
    </div>
  )
}
