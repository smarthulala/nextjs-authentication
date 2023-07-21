import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const { email, password } = requestBody

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'user does not exist' },
        { status: 400 }
      )
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Password does not match' },
        { status: 400 }
      )
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SCRET!, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    })

    response.cookies.set('token', token, { httpOnly: true })
    
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
