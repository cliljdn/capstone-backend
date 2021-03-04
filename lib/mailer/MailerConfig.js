const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
	//dev config
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use SSL

	// production config
	// host: 'sg2plvcpnl455151.prod.sin2.secureserver.net',
	// port: 465,
	// secureConnection: 'false',

	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},

	// tls: {
	// 	ciphers: 'SSLv3',
	// 	rejectUnauthorized: false,
	// },
})

function sendMail(obj) {
	return transporter.sendMail(obj, function (error, info) {
		if (error) {
			return error
		} else {
			return true
		}
	})
}

module.exports = { transporter, sendMail }
