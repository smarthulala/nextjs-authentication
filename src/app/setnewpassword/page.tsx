'use client'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SetNewPassword() {
  const [password, setPassword] = useState('1')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value)
  }

  const CheckPasswordMatch = () => {
    setNewPassword()
    setPassword('')
    setConfirmPassword('')
  }

  const setNewPassword = async () => {
    try {
      setLoading(true)

      await axios.post('/api/users/setnewpassword', { token, password })

      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
  }, [password, confirmPassword])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-4'>
      <h1>{loading ? 'Processing' : 'Set your password'}</h1>
      <label htmlFor='newPassword'>New Password</label>
      <input
        className='p-2 focus:outline-none rounded text-black'
        type='password'
        id='newPassword'
        placeholder='new password..'
        onChange={handlePasswordChange}
      />
      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input
        className='p-2 focus:outline-none rounded text-black'
        type='password'
        id='confirmPassword'
        placeholder='confirm password..'
        onChange={handleConfirmPasswordChange}
      />
      <button
        className='bg-green-700 p-2 border border-white rounded disabled:bg-slate-400'
        onClick={CheckPasswordMatch}
        disabled={!passwordMatch}
      >
        {passwordMatch === true ? 'Confirm' : 'Not match'}
      </button>
      <Link
        className='p-2 focus:outline-none w-20 bg-black border rounded-lg text-center'
        href='/login'
      >
        Login Page
      </Link>
    </div>
  )
}
