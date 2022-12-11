const nodemailer = require('nodemailer')

const sendMail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const details = {
    from: sent_from,
    to: send_to,
    // replyTo: reply_to,
    subject,
    html: message,
  }

  transporter.sendMail(details, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}

module.exports = sendMail
