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
		const address = await account.$relatedQuery('AccountAddress')
		if (account === undefined) {
			const error = new Error('Account is not registered')
			throw error
		}
		if (account.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		if (account.account_type === 'User' || account.account_type === 'Driver') {
			const profile = await account.$relatedQuery('UserProfile')
			let merge = { ...profile, ...address }
			delete merge.address_owner
			delete merge.isDriver
			res.status(200).json(merge)
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

// responds with the account of the user
router.get('/list/account/login/account', async (req, res, next) => {
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
			delete account.password
			res.status(200).json(account)
		} else {
			delete account.password
			res.status(200).json(account)
		}
	} catch (error) {
		next(error)
	}
})

// list of logged in drivers vehicle
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
	let { order } = req.query
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
		if (!order) {
			const info = await TravelHistory.query()
				.withGraphJoined('UsersCompanion')
				.where('parent_id', profile[0].user_id)

			for (const userLog of info) {
				if (userLog.UsersCompanion.length === 0) {
					userLog.UsersCompanion = 'No Companions'
				}

				delete userLog.isCompanion
				for (const comInfo of userLog.UsersCompanion) {
					delete comInfo.profile_owner
				}
			}
			res.status(200).json(info)
		} else {
			const info = await TravelHistory.query()
				.withGraphJoined('UsersCompanion')
				.where('parent_id', profile[0].user_id)
				.orderBy(order, 'DESC')

			for (const userLog of info) {
				if (userLog.UsersCompanion.length === 0) {
					userLog.UsersCompanion = 'No Companions'
				}

				delete userLog.isCompanion
				for (const comInfo of userLog.UsersCompanion) {
					delete comInfo.profile_owner
				}
				res.status(200).json(info)
			}
		}
	} catch (error) {
		next(error)
	}
})

// entered est for loggedin User, Driver
router.get('/list/establishment/entered', async (req, res, next) => {
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
			.where('parent_id', decoded.id)

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
})
module.exports = router
