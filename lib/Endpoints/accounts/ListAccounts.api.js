const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()
const Accounts = require('../../../database/Model/account_table.model')
const UserProfile = require('../../../database/Model/UserProfile.model')
const DriverProfile = require('../../../database/Model/DriverProfile.model')
const jwt = require('../../Tokens/jwt')
const EmployeeProfile = require('../../../database/Model/EmployeeProfile.model')
const Establishments = require('../../../database/Model/Establishments.model')
const DriverVehicles = require('../../../database/Model/Vehicle.model')
const TravelHistory = require('../../../database/Model/TravelHistory.model')

// responds with the profile of the user
router.get('/list/account/profile', async (req, res, next) => {
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

		const account = await Accounts.query().findById(decoded.id)
		if (account === undefined) {
			const error = new Error('Account is not registered')
			throw error
		}
		if (account.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		if (account.account_type === 'User') {
			const profile = await account
				.$relatedQuery('UserProfile')
				.then((user) => {
					res.status(200).json(user)
				})
		} else if (account.account_type === 'Driver') {
			const profile = await account
				.$relatedQuery('DriverProfile')
				.then((user) => {
					res.status(200).json(user)
				})
		} else {
			const profile = await account
				.$relatedQuery('EmployeeProfile')
				.then((user) => {
					res.status(200).json(user)
				})
		}
	} catch (error) {
		next(error)
	}
})

// list of user profile
router.get('/list/account/login/profile', async (req, res, next) => {
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

		const findAcc = await Accounts.query().findById(decoded.id)
		if (findAcc === undefined) {
			const error = new Error('Account is not yet registered')
			throw error
		}
		if (findAcc.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		if (findAcc.account_type === 'User') {
			const data = await findAcc.$relatedQuery('UserProfile')
			res.status(200).json(data)
		} else if (findAcc.account_type === 'Driver') {
			const data = await findAcc.$relatedQuery('DriverProfile')
			res.status(200).json(data)
		} else {
			const data = await findAcc.$relatedQuery('EmployeeProfile')
			res.status(200).json(data)
		}
	} catch (error) {
		next(error)
	}
})

// list of establishment
router.get('/list/account/establishment/profile', async (req, res, next) => {
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

		const est = await Establishments.query()
		res.status(200).json(est)
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

// list of driver's vehicle
router.get(
	'/list/account/driver/vehicle/:driver_id',
	async (req, res, next) => {
		const { driver_id } = req.params
		try {
			//sends token to request a vehicle of the driver
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

			const profile = await DriverProfile.query().findById(driver_id)
			if (profile === undefined || profile === null) {
				const error = new Error('cannot find account')
				throw error
			}

			const vehicle = await profile.$relatedQuery('DriverVehicles')
			if (vehicle === undefined || vehicle === null) {
				const error = new Error('Cannot find vehicle')
				throw error
			}

			res.status(200).json(vehicle)
		} catch (error) {
			next(error)
		}
	}
)

router.get('/list/account/travel/history', async (req, res, next) => {
	const { account_id } = req.params

	try {
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (decoded !== decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		const travelLog = await TravelHistory.query()
			.where('account_id', decoded.id)
			.where('isCompanion', false)
		delete travelLog[0]['isCompanion']
		if (travelLog === undefined || travelLog.length === 0) {
			const error = new Error('Account has no travel log')
			throw error
		}
		if (travelLog === null) {
			const error = new Error('Account has no travel log')
		}

		res.status(200).json(travelLog)
	} catch (error) {
		next(error)
	}
})
module.exports = router
