const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
	host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
})

function sendMail(obj) {
	return transporter.sendMail(obj, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}

module.exports = { transporter, sendMail }
