import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { verify } from 'crypto'

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'verify') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === 'forgotpassword') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    })

    const mailOptions = {
      from: 'smarthulala@hotmail.com',
      to: email,
      subject:
        emailType === 'verify' ? 'Verify your email' : 'Reset your password',
      html: `<div style="display: block; margin: auto; max-width: 600px;" class="main">
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
      <p>Click <a href="${process.env.DOMAIN}/${
        emailType === 'verify' ? 'verifyemail' : 'forgotpassword'
      }?token=${hashedToken}">here</a> to ${
        emailType === 'verify' ? 'verify your email' : 'reset your password'
      }</p>
      <br/>
      <p>or copy and paste the link below in your browser</p>
      <p>${process.env.DOMAIN}/${
        emailType === 'verify' ? 'verifyemail' : 'forgotpassword'
      }?token=${hashedToken}</p>
    </div>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
