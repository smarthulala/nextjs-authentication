import { NextRequest, NextResponse } from 'next/server'
import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const { token, password } = requestBody

    if (!token && !password) {
      return NextResponse.json(
        { message: 'Token or password not found for forgot password' },
        { status: 404 }
      )
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found for forgot password' },
        { status: 404 }
      )
    }

    user.password = hashedPassword
    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      message: 'Password updated successful',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
