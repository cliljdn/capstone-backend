const express = require('express')
const router = express.Router()
const Establishments = require('../../../database/Model/Establishments.model')
const {
	EstablishmentProfile,
} = require('../../Validations/Establishments/EstablishmentValidation')
const EstablishmentValidation = require('../../Validations/Establishments/EstablishmentValidation')
const jwt = require('../../Tokens/jwt')
const { sendMail } = require('../../mailer/MailerConfig')
const { establishments } = require('../../contants/TableNames')
const { TokenExpiredError } = require('jsonwebtoken')
// Creates profile to establishments
router.post('/establishment/create/profile', async (req, res, next) => {
	const { name, street, telephone, owner, email } = req.body

	try {
		const bldgData = {
			name: name,
			street: street,
			telephone_number: telephone,
			establishment_owner: owner,
			email: email,
			isActive: false,
		}

		await EstablishmentProfile.validate(
			{ email: bldgData.email },
			{ abortEarly: false }
		)
		const ifExist = await Establishments.query().findOne({
			name: bldgData.name,
		})

		if (ifExist) {
			const error = new Error('This establishment is already registered')
			throw error
		}

		const ifTrue = await Establishments.query().insertAndFetch(bldgData)
		console.log(ifTrue)
		const token = await jwt.sign({ id: ifTrue.establishment_id })
		const emailLink = `<a href="http://${req.headers.host}/api/v1/establishment/verify/${token}" > Click to verify </a>`
		const mailOptions = {
			from: process.env.MAIL_USER,
			to: bldgData.email,
			subject: 'Verify Establishment Email',
			text: 'ScanGapo 2020',
			html: emailLink,
		}
		sendMail(mailOptions)
		if (sendMail) {
			res.status(201).json({
				created: true,
				message: 'Success, we sent a verification link to your email',
			})
		}
	} catch (error) {
		next(error)
	}
})

router.get('/establishment/verify/:token', async (req, res, next) => {
	const { token } = req.params
	try {
		const decoded = await jwt.verify(token)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}
		const activate = await Establishments.query().findById(decoded.id)
		if (activate === undefined) {
			const error = new Error('Cannot find profile')
			throw error
		}
		if (activate.isActive === 1) {
			const error = new Error('Account is already Activated')
			throw error
		}

		if (activate) {
			const ifSuccess = await activate.$query().patch({
				isActive: true,
			})

			res.status(200).json({
				activated: true,
			})
		}
	} catch (error) {
		next(error)
	}
})

router.patch('/employee/create/working', async (req, res, next) => {
	try {
	} catch (error) {
		next(error)
	}
})

module.exports = router
