import nodemailer from 'nodemailer'
import dontenv from 'dotenv'
dontenv.config()

const config = () => {
    return {
        host: process.env.SMPT_HOST,
        service: process.env.SMPT_PORT,
        auth: {
          user: process.env.SMPT_USER,
          pass: process.env.SMPT_PASSWORD
        }
    }
}

export const transporter = nodemailer.createTransport(config());