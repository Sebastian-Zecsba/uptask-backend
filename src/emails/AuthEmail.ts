import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmartionEmail = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'Uptask - Confirma tu cuenta',
            html: `
                <p>Hola: ${user.name}, has creado tu cuenta en UpTask, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
                <p>Visita el siguiente enlache: </p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma cuenta</a>
                <p>Ingre el codigo: <b>${user.token}</b> </p>
                <p>Este token expira en 10 minutos</p>
                `
        })
        console.log('Mensaje enviado', info.messageId)
    }

    static sendPasswordResetToken = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Restablece tu password',
            text: 'Uptask - Restablece tu password',
            html: `
                <p>Hola: ${user.name}, has solicitado reestablcer tu password.</p>
                <p>Visita el siguiente enlache: </p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer password</a>
                <p>Ingre el codigo: <b>${user.token}</b> </p>
                <p>Este token expira en 10 minutos</p>
                `
        })
        console.log('Mensaje enviado', info.messageId)
    }
}