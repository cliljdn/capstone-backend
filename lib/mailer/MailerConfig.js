<<<<<<< HEAD
=======
require('dotenv').config()
>>>>>>> f24c124c6024bc84f065b2a9a950cfc0609c00f5
const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
	service: 'gmail',
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
