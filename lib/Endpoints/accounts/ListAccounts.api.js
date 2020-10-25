const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()
const Accounts = require('../../../database/Model/account_table.model')
const UserProfile = require('../../../database/Model/UserProfile.model')
const jwt = require('../../Tokens/jwt')
const EmployeeProfile = require('../../../database/Model/EmployeeProfile.model')
const Establishments = require('../../../database/Model/Establishments.model')
const DriverVehicles = require('../../../database/Model/Vehicle.model')
const TravelHistory = require('../../../database/Model/TravelHistory.model')
const { passengers, accounts_table } = require('../../contants/TableNames')
const { string } = require('yup')
const TableNames = require('../../contants/TableNames')
const Companions = require('../../../database/Model/Companion_Table.model')

/* TODO
	entered est of users and drivers
	companions of users
*/

/* Done
	logged in profile of users, drivers and employee
	list of profiles
	list of est
	list of employees
	list of vehicles
	logged in travel log of users, drivers
	list of passengers of drivers
*/

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

		if (account.account_type === 'User' || account.account_type === 'Driver') {
			const profile = await account
				.$relatedQuery('UserProfile')
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

// list of  profiles for user and driver
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

// list of driver's vehicle
router.get('/list/account/driver/vehicle', async (req, res, next) => {
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

		const profile = await UserProfile.relatedQuery('DriverVehicles').for(
			decoded.id
		)
		if (profile === undefined || profile === null) {
			const error = new Error('cannot find account')
			throw error
		}

		res.status(200).json(profile)
	} catch (error) {
		next(error)
	}
})

//get travel log of logged in user
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
		const profile = await Accounts.relatedQuery('UserProfile').for(decoded.id)
		const travelLog = await TravelHistory.query().where(
			'user_id',
			profile[0].user_id
		)

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

//list of logged in user, drivers companions
router.get('/list/users/companions/:travel_id', async (req, res, next) => {
	const { travel_id } = req.params
	try {
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No Token Provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		const account = await Accounts.query().findById(decoded.id)
		const profile = await account.$relatedQuery('UserProfile')
		console.log(profile)
		if (!profile) {
			const error = new Error('Account has no profile')
			throw error
		}

		const data = await UserProfile.query()
			.joinRelated('CompanionInfo')
			.where('travel_id', travel_id)

		res.json(data)
	} catch (error) {
		next(error)
	}
})

module.exports = router
