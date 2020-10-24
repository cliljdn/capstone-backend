const express = require('express')
const router = express.Router()
const Establishments = require('../../../database/Model/Establishments.model')
const Accounts = require('../../../database/Model/account_table.model')
const EmployeeProfile = require('../../../database/Model/EmployeeProfile.model')
const {
	EstablishmentProfile,
} = require('../../Validations/Establishments/EstablishmentValidation')
const EstablishmentValidation = require('../../Validations/Establishments/EstablishmentValidation')
const jwt = require('../../Tokens/jwt')
const { sendMail } = require('../../mailer/MailerConfig')
const { establishments, accounts_table } = require('../../contants/TableNames')
const { TokenExpiredError } = require('jsonwebtoken')
const TravelHistory = require('../../../database/Model/TravelHistory.model')
const EmployeeScanned = require('../../../database/Model/EmployeeScanned.model')
const UserProfile = require('../../../database/Model/UserProfile.model')

// entered est for loggedin User, Driver
router.get('/list/establishment/entered/:pass_id', async (req, res, next) => {
	const { pass_id } = req.params
	try {
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

		const profile = await Accounts.relatedQuery('UserProfile').for(decoded.id)
		if (!profile) {
			const error = new Error('Account has no profile')
			throw error
		}
		const info = {
			profile,
			estEntered: {},
			companions: {},
		}
		const entryInfo = await profile[0].$relatedQuery('EnteredEst')
		info.estEntered = entryInfo

		const companionInfo = await UserProfile.query()
			.select('time_entered')
			.joinRelated('EnteredEst')
			.where('pass_id', pass_id)
			.whereNot('user_id', profile[0].user_id)
		info.companions = companionInfo
		res.status(200).json(info)
	} catch (error) {
		next(error)
	}
})

// list of establishment
router.get('/list/account/establishment/profile', async (req, res, next) => {
	const { name } = req.query
	try {
		console.log(name)
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

		if (name !== undefined) {
			const est = await Establishments.query().where('name', 'like', `${name}%`)
			res.status(200).json(est)
		} else if (name === undefined) {
			const est = await Establishments.query()
			res.status(200).json(est)
		}
	} catch (error) {
		next(error)
	}
})

// list of establishment employees
router.get(
	'/list/account/establishment/employees/:id',
	async (req, res, next) => {
		const { id } = req.params
		try {
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

			const est = await Establishments.query().findById(id)
			const data = await est.$relatedQuery('Employees')

			res.status(200).json(data)
		} catch (error) {
			next(error)
		}
	}
)

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
			const error = new Error('Establishment email is already Activated')
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

router.post('/establishment/employee/scanned', async (req, res, next) => {
	const { travel_id } = req.body

	try {
		//employee token
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

		const findEmployee = await Accounts.query().findById(decoded.id)
		if (findEmployee === undefined) {
			const error = new Error('Cannot find Profile')
			throw error
		}
		if (findEmployee.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		const findTravelHistory = await TravelHistory.query().findById(travel_id)
		if (findTravelHistory === undefined) {
			const error = new Error('Cannot find Companions')
			throw error
		}

		const profile = await findEmployee.$relatedQuery('EmployeeProfile')
		if (profile === undefined || profile === null) {
			const error = new Error('This account has no profile')
			throw error
		}
		const est = await Establishments.query().findById(profile.working_in)
		if (!est) {
			const error = new Error('Employee has no work info')
			throw error
		}
		const companions = await findTravelHistory.$relatedQuery('Companions')

		if (companions === undefined || companions === null) {
			const error = new Error('Companion has no profile')
			throw error
		}

		const insertParent = await findTravelHistory
			.$relatedQuery('EstablishmentEntered')
			.insertGraph({
				employee_id: profile.employee_id,
				est_id: est.establishment_id,
				users_id: findTravelHistory.user_id,
			})

		for (const companion of companions) {
			const insertParent = await findTravelHistory
				.$relatedQuery('EstablishmentEntered')
				.insertGraph({
					employee_id: profile.employee_id,
					est_id: est.establishment_id,
					users_id: companion.users_id,
				})
		}

		res.status(201).json({
			created: true,
			message: 'Successfully recorded',
		})
	} catch (error) {
		next(error)
	}
})

module.exports = router
