const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
	//host: 'gmail',
	host: 'smtp.gmail.com',
	port: 2525, // port for secure SMTP
	secureConnection: false, // TLS requires secureConnection to be false
	tls: {
		ciphers: 'SSLv3',
	},
	requireTLS: true, //this parameter solved problem for me
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
