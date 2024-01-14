import { NextApiRequest, NextApiResponse } from 'next'

const rateLimit: number = 10 // Number of allowed requests per minute

interface RateLimiter {
  [ip: string]: number[]
}

const rateLimiter: RateLimiter = {}

const rateLimiterMiddleware = (ip: string): boolean => {
  const now: number = Date.now()
  const windowStart: number = now - 60 * 1000 // 1 minute ago

  if (!rateLimiter[ip]) {
    rateLimiter[ip] = []
  }

  const requestTimestamps: number[] = rateLimiter[ip].filter(
    (timestamp) => timestamp > windowStart
  )
  requestTimestamps.push(now)

  rateLimiter[ip] = requestTimestamps

  return requestTimestamps.length <= rateLimit
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  //check that honeypot is empty
  const honeyPot: string = req.body.lastName
  if (honeyPot) {
    return res.status(403).json({ errorMessage: 'not Authorized' })
  }

  //check that origin is authorized
  const origin: string | string[] | undefined = req.headers.origin

  // buggy in deployed version to be fixed
  // let protocol = 'https'

  // if (process.env.NODE_ENV === 'development') {
  //   protocol = 'http'
  // }

  // const domain = process.env.VERCEL_URL

  // if (origin != `${protocol}://${domain}`) {
  //   return res.status(403).json({ errorMessage: 'not Authorized' })
  // }

  //rate limiter
  const ipAddress: string | string[] | undefined =
    req.headers['x-real-ip'] || req.connection.remoteAddress
  const ip: string = Array.isArray(ipAddress) ? ipAddress[0] : ipAddress || '' // Default value as empty string

  if (!rateLimiterMiddleware(ip)) {
    res.status(429).json({ message: 'Too Many Requests' })
    return
  }

  //check that method is POST
  if (req.method != 'POST')
    return res.status(403).json({ errorMessage: 'not Authorized' })

  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 587,
    host: 'smtp.mailgun.org',
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
    text: req.body.message + ' || sender email: ' + req.body.email,
  }

  return transporter.sendMail(mailData, function (err: any, info: any) {
    if (err) return res.status(500).json({ message: 'erreur : ' + err.code })
    else return res.status(200).json({ message: 'Mail envoyé avec succès' })
  })
}
