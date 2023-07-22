import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const { email } = requestBody

    console.log(requestBody)

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({
        message: 'User with the specified email not found',
        success: false,
      })
    }

    await sendEmail({
      email,
      emailType: 'resetPassword',
      userId: user._id,
    })

    return NextResponse.json({
      message: 'reset email sent successful',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
