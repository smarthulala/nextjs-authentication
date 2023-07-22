'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const onSend = async () => {
    try {
      setLoading(true)

      const response = await axios.post('/api/users/sendresetemail', { email })

      console.log('signup success', response.data)
      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event: any) => {
    setEmail(event.target.value)
  }

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <hr />
      <label htmlFor='email'>
        {loading ? 'Sending' : 'Please enter email'}
      </label>
      <input
        className='p-2 focus:outline-none rounded text-black'
        type='text'
        id='email'
        placeholder='Email..'
        onChange={handleChange}
      />
      <button
        onClick={onSend}
        className='p-2 focus:outline-none w-20 bg-emerald-600 border rounded-lg text-center'
      >
        Send
      </button>
    </div>
  )
}
