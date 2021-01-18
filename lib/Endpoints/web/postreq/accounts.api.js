const express = require('express')
const router = express.Router()
const Accounts = require('../../../../database/Model/account_table.model')
const {
	registerValidation,
	loginValidation,
	companionEmailValidate,
} = require('../../../Validations/Accounts/AccountValidation')
const bcrypt = require('bcrypt')
const { transporter, sendMail } = require('../../../mailer/MailerConfig')
const jwt = require('../../../Tokens/jwt')
const UserProfile = require('../../../../database/Model/UserProfile.model')

// accounts login
router.post('/accounts/login', async (req, res, next) => {
	const { email, password } = req.body
	try {
		const reqBody = {
			email: email,
			password: password,
		}
		const validateData = await loginValidation.validate(reqBody, {
			abortEarly: false,
		})

		const checkedData = await Accounts.query().findOne({
			email: reqBody.email,
		})
		if (checkedData === undefined) {
			const error = new Error('Email is not registered')
			throw error
		}
		if (checkedData.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		const checkPass = await bcrypt.compareSync(
			reqBody.password,
			checkedData.password
		)
		console.log(checkPass)
		if (!checkPass) {
			const error = new Error('Wrong Password')
			throw error
		}

		const token = await jwt.sign({ id: checkedData.account_id })
		if (checkedData && checkPass) {
			res.status(201).json({
				name: `${checkedData.account_type}-${checkedData.account_id}`,
				account_type: checkedData.account_type,
				auth: true,
				token: token,
			})
		}
	} catch (error) {
		next(error)
	}
})

// accounts register
router.post('/accounts/register', async (req, res, next) => {
	const { email, password, accountType } = req.body
	try {
		const accountData = {
			email: email,
			password: password,
			account_type: accountType,
		}

		const validateEntry = await registerValidation.validate(accountData, {
			abortEarly: false,
		})

		const checkIfExist = await Accounts.query().findOne({
			email: accountData.email,
		})

		if (checkIfExist) {
			const error = new Error('Email is already Registered')
			throw error
		}

		const hash = await bcrypt.hashSync(accountData.password, 10)
		if (hash) {
			const insertedData = await Accounts.query().insert({
				email: accountData.email,
				password: hash,
				account_type: accountData.account_type,
				isActive: false,
			})
			// creates a token for the user
			const token = await jwt.sign({ id: insertedData.account_id })
			// anchor tag for email
			// const emailLink = `<a href="http://scanolongapo.com/accounts/verify/${token}" > Click to verify </a>`
			const emailLink = `<a href="http://localhost:6060/api/v1/accounts/verify/${token}" > Click to verify </a>`

			// mail credentials
			const mailOptions = {
				from: process.env.MAIL_USER,
				to: insertedData.email,
				subject: 'Verify Email',
				text: 'ScanGapo 2020',
				html: emailLink,
			}
			//sends email for registered accounts
			transporter.sendMail(mailOptions, (error, info) => {
				return error
					? console.error(error)
					: console.log(`Email sent: ${info.response}`)
			})

			if (insertedData) {
				res.status(200).json({
					created: true,
					message: 'registered',
				})
			}
		}
	} catch (error) {
		next(error)
	}
})

// create profile for regitered accounts.
router.post('/accounts/create/profile', async (req, res, next) => {
	const {
		firstName,
		lastName,
		middleName,
		birthday,
		contact,
		image,
		position,
	} = req.body

	try {
		const dataBody = {
			firstname: firstName,
			lastname: lastName,
			middlename: middleName,
			birthday: birthday,
			contactnumber: contact,
			image: image,
			position: position,
		}

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}

		const findAccount = await Accounts.query().findById(decoded.id)
		const ifExist = await findAccount
			.$relatedQuery('UserProfile')
			.for(decoded.id)
		if (ifExist) throw new Error('User already have profile')
		await findAccount
			.$relatedQuery('UserProfile')
			.for(findAccount.account_id)
			.insert(dataBody)

		res.status(201).json({
			created: true,
			message: 'Success',
		})
	} catch (error) {
		next(error)
	}
})

// updates the profile
router.patch('/accounts/update/profile', async (req, res, next) => {
	const {
		firstName,
		lastName,
		middleName,
		birthday,
		contact,
		image,
		position,
	} = req.body

	try {
		let dataBody = {
			firstname: firstName,
			lastname: lastName,
			middlename: middleName,
			birthday: birthday,
			contactnumber: contact,
			image: image,
			position: position,
		}

		Object.keys(dataBody).forEach((key) =>
			dataBody[key] === '' ? (dataBody[key] = undefined) : {}
		)

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}

		const findAccount = await Accounts.query().findById(decoded.id)
		let test = await findAccount
			.$relatedQuery('UserProfile')
			.for(findAccount.account_id)

		await findAccount
			.$relatedQuery('UserProfile')
			.for(findAccount.account_id)
			.patch(dataBody)

		res.status(201).json({
			updated: true,
			message: 'Success',
		})
	} catch (error) {
		next(error)
	}
})

//update account
router.patch('/update/account', async (req, res, next) => {
	const { email, password } = req.body

	try {
		let credentials = {
			email: email,
			password: password,
		}

		Object.keys(credentials).forEach((key) =>
			credentials[key] === '' ? (credentials[key] = undefined) : {}
		)

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		const checkAcc = await Accounts.query().findById(decoded.id)
		if (checkAcc === undefined) {
			const error = new Error('No such Account')
			throw error
		}

		const hash = await bcrypt.hashSync(credentials.password, 10)
		credentials.password = hash

		await Accounts.query().findById(checkAcc.account_id).patch(credentials)

		res.status(201).json({
			updated: true,
			message: 'Success',
		})
	} catch (error) {
		next(error)
	}
})

// verification for account
router.get('/accounts/verify/:token', async (req, res, next) => {
	const { token } = req.params
	try {
		const decoded = await jwt.verify(token)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		const checkAcc = await Accounts.query().findById(decoded.id)
		if (checkAcc === undefined) {
			const error = new Error('No such user')
			throw error
		}

		if (checkAcc.isActive === 1) {
			const error = new Error('Account is already Verified')
			throw error
		}

		if (checkAcc) {
			const activatedAcc = await checkAcc.$query().patch({
				isActive: true,
			})
			res.status(200).json({
				email: checkAcc.email,
				account_type: checkAcc.account_type,
				verified: true,
				message: 'verified',
			})
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router