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
const { passengers } = require('../../contants/TableNames')
const { string } = require('yup')

// responds with the profile of the user
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

// list of users profiles
router.get('/list/account/users/profiles', async (req, res, next) => {
	const { order } = req.query
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

		const profile = await UserProfile.query()

		res.status(200).json(profile)
	} catch (error) {
		next(error)
	}
})

// list of driver profiles
router.get('/list/account/driver/profiles', async (req, res, next) => {
	const { order } = req.query
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

		const profile = await DriverProfile.query()

		res.status(200).json(profile)
	} catch (error) {
		next(error)
	}
})

// list of driver profiles
router.get('/list/account/employee/profiles', async (req, res, next) => {
	const { order } = req.query
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

		const profile = await EmployeeProfile.query()

		res.status(200).json(profile)
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

//get travel log of login user
router.get('/list/account/travel/history', async (req, res, next) => {
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

		if (
			travelLog === undefined ||
			travelLog.length === 0 ||
			travelLog === null
		) {
			const error = new Error('Account has no travel log')
			throw error
		}

		if (travelLog === null) {
			const error = new Error('Account has no travel log')
		}

		for (let i = 0; i < travelLog.length; i++) {
			delete travelLog[i]['isCompanion']
			delete travelLog[i]['account_id']
		}
		res.status(200).json(travelLog)
	} catch (error) {
		next(error)
	}
})

//get log in driver's passengers.
router.get('/list/driver/passengers/:id', async (req, res, next) => {
	const { id } = req.params
	const { name, order } = req.query
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

		const account = await Accounts.relatedQuery('DriverProfile').for(id)
		console.log(account)
		if (account === undefined || account.length === 0) {
			const error = new Error('Please create a profile first')
			throw error
		}
		const passenger = await DriverProfile.relatedQuery(
			'DriverIdentitifier'
		).for(account[0].driver_id)
		if (passenger === undefined || passenger.length === 0) {
			const error = new Error('driver does not have list of passenger')
			throw error
		}

		let arrList = []
		// iterates through passenger data
		for (const item of passenger) {
			arrList.push({ account_id: item.account_id, travel_id: item.travel_id })
		}

		let usersInfo = []
		let accountInfo = []
		for (const ids of arrList) {
			const account = await Accounts.query().findById(ids.account_id)
			accountInfo.push(account)
		}

		for (const account of accountInfo) {
			if (account.account_type === 'Driver') {
				const data = await account
					.$relatedQuery('DriverProfile')
					.for(account.account_id)
					.where(order, 'desc')
				usersInfo.push(data)
			}
			if (account.account_type === 'User') {
				const data = await account
					.$relatedQuery('UserProfile')
					.for(account.account_id)
					.where(order, 'desc')
				usersInfo.push(data)
			}
		}

		res.json(usersInfo)
	} catch (error) {
		next(error)
	}
})

module.exports = router
