import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcriptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcriptjs.hash(userId.toString(), 10)
    if (emailType === 'verify') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === 'resetPassword') {
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
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/setnewpassword?token=${hashedToken}">here</a> to ${
        emailType === 'verify' ? 'Verify your email' : 'Reset your password'
      } or copy and paste the link in your browser. <br> ${
        process.env.DOMAIN
      }/setnewpassword?token=${hashedToken}</p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
