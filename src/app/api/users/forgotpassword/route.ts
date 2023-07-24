import { NextRequest, NextResponse } from 'next/server'
import { connect } from '@/dbConfig/dbConfig'
import { sendMail } from '@/helpers/mailer'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    console.log(requestBody)
    const { email } = requestBody

    const token = jwt.sign({ email }, process.env.TOKEN_SCRET!, {
      expiresIn: '1d',
    })

    const user = await User.findOneAndUpdate(
      { email },
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      },
      { new: true }
    )

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    sendMail({ email, emailType: 'forgotpassword', userId: user._id })

    return NextResponse.json({
      message: 'Email send successful',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
