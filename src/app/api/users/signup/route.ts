import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const responseBody = await request.json()
    const { username, email, password } = responseBody

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json(
        { message: 'User already exist' },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()

    await sendMail({ email, emailType: 'verify', userId: savedUser._id })

    return NextResponse.json({
      message: 'User create successful',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
