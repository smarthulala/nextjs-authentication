import { connect } from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
import User from '@/models/userModel'

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const { token } = requestBody

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      )
    }

    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    return NextResponse.json({
      message: 'Password reset successful',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json('Error in forgotpassword api', error.message)
  }
}
