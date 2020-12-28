const express = require('express')
const router = express.Router()
const jwt = require('../../Tokens/jwt')
const {
	AdminRegister,
	loginValidation,
} = require('../../Validations/Accounts/AccountValidation')
const Accounts = require('../../../database/Model/account_table.model')
const bcrypt = require('bcrypt')
const { sendMail } = require('../../mailer/MailerConfig')

router.get('/list/admin/profile', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No Token Provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')
		const account = await AdminAccount.query().findById(decoded.id)
		const profile = await AdminAccount.relatedQuery('Profile').for(decoded.id)
		const address = await profile[0].$relatedQuery('Address')

		const merge = { ...account, ...profile[0], ...address }
		delete merge.address_owner
		delete merge.profile_owner
		res.status(200).json(merge)
	} catch (error) {
		next(error)
	}
})

router.get('/list/admin/account', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid token')

		const account = await AdminAccount.query().findById(decoded.id)
		delete account.password
		delete account.created_at
		delete account.updated_at
		delete account.isActive
		res.status(200).json(account)
	} catch (error) {
		next(error)
	}
})

//register for admin
router.post('/admin/create/account', async (req, res, next) => {
	const { email, password } = req.body

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

		if (ifExist) throw new Error('Email is already registered')

		const hash = await bcrypt.hashSync(adminEntry.password, 10)
		if (hash) {
			const newAdmin = await AdminAccount.query().insertAndFetch({
				email: adminEntry.email,
				password: hash,
				isActive: false,
			})

			// creates a token for the user
			const token = await jwt.sign({ id: newAdmin.admin_id })
			// anchor tag for email
			const emailLink = `<a href="http://scanolongapo.com/admin/verify/${token}" > Click to verify </a>`
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

// login for admin
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
		if (account === undefined) throw new Error('Email is not registered')

		if (account.isActive === 0) throw new Error('Account is not yet activated')

		const checkPass = await bcrypt.compareSync(
			credentials.password,
			account.password
		)
		if (!checkPass) throw new Error('Wrong password')

		const token = await jwt.sign({ id: account.admin_id })
		if (account && checkPass) {
			res.status(201).json({
				name: `Admin-${account.admin_id}`,
				auth: true,
				token: token,
			})
		}
	} catch (error) {
		next(error)
	}
})

// creates profile data for admin
router.post('/admin/create/profile', async (req, res, next) => {
	const { firstName, lastName, middleName, birthday, contact, image } = req.body

	try {
		const credentials = {
			firstname: firstName,
			lastname: lastName,
			middlename: middleName,
			birthday: birthday,
			contactnumber: contact,
			image: image,
		}

		// check if user is logged in
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		//verifies token
		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid token')

		if (credentials.age < 21)
			throw new Error('20 years old below cannot register')

		const account = await AdminAccount.query().findById(decoded.id)
		const profile = await account
			.$relatedQuery('Profile')
			.for(account.admin_id)
			.insert(credentials)

		res.status(201).json('Success')
	} catch (error) {
		next(error)
	}
})

// creates address data for admin
router.patch('/admin/update/account', async (req, res, next) => {
	const { email, newPass, confirmPass } = req.body
	try {
		const credentials = {
			email: email,
			password: newPass,
		}

		//api key
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		// validates credentials
		await loginValidation.validate(credentials, { abortEarly: false })

		//decodes the token
		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid token')

		//finds the admin account
		const account = await AdminAccount.query().findById(decoded.id)

		//compares the old password of the user
		const comparePass = await bcrypt.compareSync(confirmPass, account.password)
		if (!comparePass) throw new Error('You entered the wrong old password')

		const hash = await bcrypt.hashSync(credentials.password, 10)

		//assigning new value to admin credentials
		credentials.password = hash

		const patchCredentials = await account
			.$query()
			.patch(credentials)
			.then(() => {
				res.status(201).json('Updated')
			})
	} catch (error) {
		next(error)
	}
})

// updates profile of admin
router.patch('/admin/update/profile', async (req, res, next) => {
	const { firstname, lastname, middlename, birthday, contact, image } = req.body

	try {
		const credentials = {
			firstname: firstname,
			lastname: lastname,
			middlename: middlename,
			contactnumber: contact,
			image: image,
		}

		// check if user is logged in
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		//verifies token
		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid token')

		if (credentials.age < 21)
			throw new Error('20 years old below cannot register')

		if (credentials.contactnumber.length < 11)
			throw new Error('mobile number must be 11 characters')

		const account = await AdminAccount.query().findById(decoded.id)
		const profile = await account
			.$relatedQuery('Profile')
			.for(account.admin_id)
			.patch(credentials)

		res.status(201).json('Profile Updated')
	} catch (error) {
		next(error)
	}
})

//verifies the account of admin
router.get('/admin/verify/email/:token', async (req, res, next) => {
	const { token } = req.params
	try {
		const decoded = await jwt.verify(token)
		if (!decoded) throw new Error('Invalid Token')

		const account = await AdminAccount.query().findById(decoded.id)
		if (account === undefined) throw new Error('No such user')

		if (account.isActive === 1) throw new Error('Account is already Verified')

		const activateAcc = await account
			.$query()
			.patch({
				isActive: true,
			})
			.then(() => {
				res.status(200).json({
					email: account.email,
					verified: true,
					message: 'verified',
				})
			})
	} catch (error) {
		next(error)
	}
})

module.exports = router
