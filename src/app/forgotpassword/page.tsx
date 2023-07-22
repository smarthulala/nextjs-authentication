'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function ForgotPassword() {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <hr />
      <label htmlFor='email'>Email</label>
      <input
        className='p-2 focus:outline-none rounded text-black'
        type='text'
        id='email'
        placeholder='Email..'
      />
      <button className='p-2 focus:outline-none w-20 bg-emerald-600 border rounded-lg text-center'>
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
