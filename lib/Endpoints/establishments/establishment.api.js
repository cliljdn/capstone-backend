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
const {
	establishments,
	accounts_table,
	user_profile,
	employee_scanned,
	companion_table,
	employee_profile,
} = require('../../contants/TableNames')
const { TokenExpiredError } = require('jsonwebtoken')
const TravelHistory = require('../../../database/Model/TravelHistory.model')
const EmployeeScanned = require('../../../database/Model/EmployeeScanned.model')
const UserProfile = require('../../../database/Model/UserProfile.model')
const TableNames = require('../../contants/TableNames')
const Companions = require('../../../database/Model/Companion_Table.model')
const { knex } = require('../../../database/Model/UserProfile.model')
const fillArray = require('../../../database/Controllers/UserController')
const EstCompanions = require('../../../database/Model/Est_Companions.model')
// entered est for loggedin User, Driver
router.get(
	'/list/establishment/entered/:profile_id',
	async (req, res, next) => {
		const { profile_id } = req.params
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

			const info = await Establishments.query()
				.select('establishments.*', 'date_created', 'time_created')
				.withGraphJoined('UsersCompanions')
				.where('parent_id', profile_id)

			if (info === undefined || info.length === 0) {
				const error = new Error('User has no record')
				throw error
			}

			for (const est of info) {
				if (est.UsersCompanions.length === 0) {
					delete est.UsersCompanions
				}

				delete est.isActive
				delete est.email
			}
			res.status(200).json(info)
		} catch (error) {
			next(error)
		}
	}
)

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
	const { parentToken, comEmail } = req.body

	try {
		const users = {
			parent: parentToken,
			companion: comEmail,
		}
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
		const empAcc = await Accounts.query().findById(decoded.id)
		const empProfile = await Accounts.relatedQuery('EmployeeProfile').for(
			decoded.id
		)
		const est = await Establishments.query().findById(empProfile[0].working_in)
		if (empAcc.account_type !== 'Employee') {
			const error = new Error('Employee account is needed')
			throw error
		}

		const decodeParent = await jwt.verify(users.parent)
		const parentAccount = await Accounts.query().findById(decodeParent.id)
		const parentProfile = await parentAccount.$relatedQuery('UserProfile')

		const profileId = []
		const parentId = []
		console.log(users.companion.length)
		if (users.companion.length === 0) {
			profileId.push(parentProfile.user_id)
			parentId.push(fillArray(parentProfile.user_id, users.companion.length))
			for (const id of profileId) {
				const insertToScanned = await empProfile[0]
					.$relatedQuery('GraphUsers')
					.insertGraph({
						est_id: est.establishment_id,
						users_id: id,
					})
			}

			await est.$relatedQuery('GraphCompanions').insertGraph({
				est_id: est.establishment_id,
				users_id: null,
				parent_id: parentProfile.user_id,
			})
		} else {
			for (const email of users.companion) {
				const comAccount = await Accounts.query().findOne('email', email)
				const comProfile = await comAccount
					.$relatedQuery('UserProfile')
					.for(comAccount.account_id)
				profileId.push(comProfile.user_id)
				parentId.push(fillArray(comProfile.user_id, users.companion.length))
				if (!comAccount) {
					const error = new Error(`this email is not yet registered ${email}`)
					throw error
				}
				if (parentAccount.email === comAccount.email) {
					const error = new Error('you cannot include yourself in companions')
					throw error
				}
			}
			profileId.push(parentProfile.user_id)
			console.log(profileId)
			parentId.push(fillArray(parentProfile.user_id, users.companion.length))

			for (const id of profileId) {
				const insertToScanned = await empProfile[0]
					.$relatedQuery('GraphUsers')
					.insertGraph({
						est_id: est.establishment_id,
						users_id: id,
					})
			}

			for (let i = 0; i < parentId.length; i++) {
				for (let j = 0; j < parentId[i].length; j++) {
					profileId.push(profileId.shift())
					if (profileId[i] !== parentId[i][j]) {
						await est.$relatedQuery('GraphCompanions').insertGraph({
							est_id: est.establishment_id,
							users_id: profileId[i],
							parent_id: parentId[i][j],
						})
					} else {
						profileId.push(profileId.shift())
						await est.$relatedQuery('GraphCompanions').insertGraph({
							est_id: est.establishment_id,
							users_id: profileId[i],
							parent_id: parentId[i][j],
						})
					}
				}
			}
		}

		res.status(200).json('Successfully recorded')
	} catch (error) {
		next(error)
	}
})

module.exports = router
