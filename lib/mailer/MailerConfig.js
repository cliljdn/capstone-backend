const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
	//dev config
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use SSL

	// production config
	// host: 'sg3plcpnl0203.prod.sin3.secureserver.net',
	// secureConnection: false,
	// port: 465,

	// proxy: 'http://127.0.0.1:6060/',
	// requireTLS: true,
	// ignoreTLS: true, // add this
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},

	// tls: {
	// 	ciphers: 'SSLv3',
	// },
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
