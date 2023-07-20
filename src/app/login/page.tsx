'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { axios } from 'axios'

export default function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const onLogin = async () => {}

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <h1>Login</h1>
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
