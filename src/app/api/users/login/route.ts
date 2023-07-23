import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
  try {
    const responseBody = await request.json()
    const { email, password } = responseBody

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { message: 'User is not found' },
        { status: 400 }
      )
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json(
        { message: 'Password not correct' },
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
      message: 'login successful',
      success: true,
    })

    response.cookies.set('token', token, { httpOnly: true })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
