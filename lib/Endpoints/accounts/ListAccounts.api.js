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
router.get('/list/account/user/profile', async (req, res, next) => {
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

		const userProfile = await UserProfile.query()
		res.status(200).json(userProfile)
	} catch (error) {
		next(error)
	}
})

// list of driver profile
router.get('/list/account/driver/profile', async (req, res, next) => {
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

		const drivers = await DriverProfile.query()
		res.status(200).json(drivers)
	} catch (error) {
		next(error)
	}
})
// list of employee profile
router.get('/list/account/employee/profile', async (req, res, next) => {
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

		const employee = await EmployeeProfile.query()
		res.status(200).json(employee)
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
router.get('/list/account/establishment/employees', async (req, res, next) => {
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

		const est = await Establishments.query().withGraphFetched('Employees')
		// const data = await

		res.status(200).json(est)
	} catch (error) {
		next(error)
	}
})

// list of driver's vehicle
router.get('/list/account/driver/vehicle', async (req, res, next) => {
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

		const driver = await Accounts.query().findById(decoded.id)
		const profile = await driver.$relatedQuery('DriverProfile')
		const vehicle = await DriverProfile.relatedQuery('DriverVehicles').for(
			profile.driver_id
		)
		if (driver === undefined) {
			const error = new Error('cannot find account')
			throw error
		}
		if (driver.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}
		if (driver.account_type !== 'Driver') {
			const error = new Error('Invalid account type')
			throw error
		}

		res.status(200).json(vehicle)
	} catch (error) {
		next(error)
	}
})

module.exports = router
