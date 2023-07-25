import { connect } from '@/dbConfig/dbConfig'
import { NextResponse } from 'next/server'

connect()

export async function GET() {
  try {
    const response = await NextResponse.json({
      message: 'logout successful',
      success: true,
    })

    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })
    return response
  } catch (error: any) {
    return NextResponse.json(error.message)
  }
}
