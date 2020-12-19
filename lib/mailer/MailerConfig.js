const nodeMailer = require('nodemailer')
require('dotenv').config()

// const transporter = nodeMailer.createTransport({
// 	host: 'mail.capstone-project@scanolongapo-api.com', // hostname
// 	port: 465,
// 	secure: true,
// 	requireTLS: true,
// 	// ignoreTLS: true, // add this
// 	auth: {
// 		user: process.env.MAIL_USER,
// 		pass: process.env.MAIL_PASS,
// 	},
// })
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kole.prosacco34@ethereal.email',
        pass: '5X3vQPgQRYMeJ1p2fF'
    }
});
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
