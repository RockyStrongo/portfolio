import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method != 'POST') return res.status(403).json({ errorMessage: "not Authorized" })

    let nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp.mailgun.org",
        auth: {
            user: process.env.MAILGUN_USER,
            pass: process.env.MAILGUN_PASSWORD,
        },
        secureConnection: false, // TLS requires secureConnection to be false
    })

    const mailData = {
        from: process.env.MAILGUN_USER,
        to: process.env.PERSONAL_EMAIL,
        subject: `Portfolio Message From ${req.body.name}`,
        text: req.body.message + " || sender email: " + req.body.email,
        // html: req.body.message
    }

    transporter.sendMail(mailData, function (err: any, info: any) {
        if (err)
            return res.status(500).json({ message: "erreur : "+err.code })
        else
            return res.status(200).json({ message: "Mail envoyé avec succès" })
    })
}