import { NextRequest, NextResponse } from 'next/server'
import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const { token } = requestBody
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' })
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      message: 'Email verified successful',
      success: true,
      email: user.email,
    })
  } catch (error: any) {
    return NextResponse.json('error on veryfyapi', error.message)
  }
}
