const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
	name: '127.0.0.1',
	//host: 'gmail',
	host: 'smtp.gmail.com',
	port: 22,
	secure: false,
	logger: true,
	debug: true,
	ignoreTLS: true, // add this
	options: {
		debug: true,
	},
	// proxy: 'http://127.0.0.1:6060/',
	// requireTLS: true,
	// ignoreTLS: true, // add this
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
