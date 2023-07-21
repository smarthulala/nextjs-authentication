'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/signup', user)

      console.log('signup success', response.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed', error)
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
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <label htmlFor='username'>Username</label>
      <input
        className='p-2 focus:outline-none rounded text-black'
        type='text'
        id='username'
        placeholder='Username..'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        type='password'
        id='password'
        placeholder='Password..'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className='p-2 focus:outline-none min-w-20 bg-black border rounded-lg text-center'
        onClick={onSignup}
      >
        {buttonDisabled ? 'Please fill in all fields' : 'Signup'}
      </button>
      Or
      <Link
        className='p-2 focus:outline-none min-w-20 bg-emerald-600 border rounded-lg text-center'
        href='/login'
      >
        Login
      </Link>
    </div>
  )
}
