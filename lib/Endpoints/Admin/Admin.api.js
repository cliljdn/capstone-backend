const express = require('express')
const router = express.Router()
const jwt = require('../../Tokens/jwt')
const {
	AdminRegister,
	loginValidation,
} = require('../../Validations/Accounts/AccountValidation')
const AdminAccount = require('../../../database/Model/AdminAccounts.model')
const AdminProfile = require('../../../database/Model/AdminProfile.model')
const Accounts = require('../../../database/Model/account_table.model')
const bcrypt = require('bcrypt')
const { sendMail } = require('../../mailer/MailerConfig')
router.post('/admin/create/account', async (req, res, next) => {
	const { email, password, account_type } = req.body

	try {
		const adminEntry = {
			email: email,
			password: password,
		}

		const data = await AdminRegister.validate(adminEntry, { abortEarly: false })

		//check if email exist
		const ifExist = await AdminAccount.query().findOne({
			email: adminEntry.email,
		})

		//check if email exist on accounts table of users.
		// const checkIfTampered = await Accounts.query().findOne({
		// 	email: adminEntry.email,
		// })

		if (ifExist) {
			const error = new Error('Email is already registered')
			throw error
		}

		const hash = await bcrypt.hashSync(adminEntry.password, 10)
		if (hash) {
			const newAdmin = await AdminAccount.query().insertAndFetch({
				email: adminEntry.email,
				password: hash,
			})

			// creates a token for the user
			const token = await jwt.sign({ id: newAdmin.admin_id })
			// anchor tag for email
			const emailLink = `<a href="http://${req.headers.host}/api/v1/admin/verify/${token}" > Click to verify </a>`
			// mail credentials
			const mailOptions = {
				from: process.env.MAIL_USER,
				to: newAdmin.email,
				subject: 'Admin Email Verification',
				text: 'ScanGapo 2020',
				html: emailLink,
			}

			//sends verification to registered admin
			sendMail(mailOptions)

			res.status(201).json('Registered')
		}
	} catch (error) {
		next(error)
		console.error(error)
	}
})

router.post('/admin/login', async (req, res, next) => {
	const { email, password } = req.body
	try {
		const credentials = {
			email: email,
			password: password,
		}

		// validates login credentials
		await loginValidation.validate(credentials, {
			abortEarly: false,
		})

		const account = await AdminAccount.query().findOne({
			email: credentials.email,
		})
		if (account === undefined) {
			const error = new Error('Email is not registered')
			throw error
		}

		if (account.isActive === 0) {
			const error = new Error('Account is not yet activated')
			throw error
		}

		const checkPass = await bcrypt.compareSync(
			credentials.password,
			account.password
		)
		if (!checkPass) {
			const error = new Error('Wrong password')
			throw error
		}

		const token = await jwt.sign({ id: account.admin_id })
		if (account && checkPass) {
			res.status(201).json({
				auth: true,
				token: token,
			})
		}
	} catch (error) {
		next(error)
	}
})

router.post('/admin/create/profile', async (req, res, next) => {
	const { fName, lName, mName, age, contact, image } = req.body

	try {
		const credentials = {
			firstname: fName,
			lastname: lName,
			middlename: mName,
			age: age,
			contactnumber: contact,
			image: image,
		}

		// check if user is logged in
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		//verifies token
		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}

		if (credentials.age < 21) {
			const error = new Error('20 years old below cannot register')
			throw error
		}

		const account = await AdminAccount.query().findById(decoded.id)
		const profile = await account
			.$relatedQuery('Profile')
			.for(account.admin_id)
			.insert(credentials)
		console.log(profile)
	} catch (error) {
		next(error)
	}
})

router.patch('/admin/update/profile', async (req, res, next) => {
	const { fName, lName, mName, age, contact, image } = req.body

	try {
		const credentials = {
			age: age,
			contactnumber: contact,
			image: image,
		}

		// check if user is logged in
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		//verifies token
		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}

		if (credentials.age < 21) {
			const error = new Error('20 years old below cannot register')
			throw error
		}

		const account = await AdminAccount.query().findById(decoded.id)
		const profile = await account
			.$relatedQuery('Profile')
			.for(account.admin_id)
			.patch(credentials)
		console.log(profile)
	} catch (error) {
		next(error)
	}
})

router.get('/admin/verify/:token', async (req, res, next) => {
	const { token } = req.params
	try {
		const decoded = await jwt.verify(token)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		const account = await AdminAccount.query().findById(decoded.id)
		if (account === undefined) {
			const error = new Error('No such user')
			throw error
		}
		if (account.isActive === 1) {
			const error = new Error('Account is already Verified')
			throw error
		}

		const activateAcc = await account
			.$query()
			.patch({
				isActive: true,
			})
			.then(() => {
				res.status(200).json({
					verified: true,
					message: 'verified',
				})
			})
	} catch (error) {
		next(error)
	}
})

module.exports = router
