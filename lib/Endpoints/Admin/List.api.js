const express = require('express')
const Accounts = require('../../../database/Model/account_table.model')
const router = express.Router()
const UserProfile = require('../../../database/Model/UserProfile.model')
const jwt = require('../../Tokens/jwt')
const Establishments = require('../../../database/Model/Establishments.model')
const TravelHistory = require('../../../database/Model/TravelHistory.model')

//get list of drivers
router.get('/list/drivers', async (req, res, next) => {
	let { order, page, search } = req.query
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

		if (search) {
			const drivers = await UserProfile.query()
				.where('isDriver', 1)
				.where((builder) => {
					builder
						.where('firstname', 'like', `%${search}%`)
						.orWhere('lastname', 'like', `%${search}%`)
						.orWhere('middlename', 'like', `%${search}%`)
				})

			if (drivers.length === 0) throw new Error('No results founds')
			res.status(200).json(drivers)
		}

		if (order === undefined || search === undefined) {
			page = 0
			const drivers = await UserProfile.query()
				.where('isDriver', 1)
				.page(page, 6)

			if (drivers.results.length === 0) throw new Error('No results founds')

			res.status(200).json(drivers)
		} else {
			const drivers = await UserProfile.query()
				.where('isDriver', 1)
				.page(page, 6)
				.orderBy(order, 'DESC')
			res.status(200).json(drivers)
		}
	} catch (error) {
		next(error)
	}
})

// get list of users
router.get('/list/users', async (req, res, next) => {
	let { search, order, page } = req.query

	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid token')

		if (search) {
			const users = await UserProfile.query()
				.where('isDriver', 0)
				.where((builder) => {
					builder
						.where('firstname', 'like', `%${search}%`)
						.orWhere('lastname', 'like', `%${search}%`)
						.orWhere('middlename', 'like', `%${search}%`)
				})

			if (users.length === 0) throw new Error('No results founds')
			res.status(200).json(users)
		}

		if (order === undefined || search === undefined) {
			page = 0
			const users = await UserProfile.query().where('isDriver', 0).page(page, 6)
			if (users.results.length === 0) throw new Error('No results founds')

			res.status(200).json(users)
		} else {
			const users = await UserProfile.query()
				.where('isDriver', 0)
				.page(page, 6)
				.orderBy(order, 'DESC')
			res.status(200).json(users)
		}
	} catch (error) {
		next(error)
	}
})

//get driver profile
router.get('/list/driver/profile/:id', async (req, res, next) => {
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

		const drivers = await UserProfile.query().findById(id).where('isDriver', 1)
		const address = await Accounts.relatedQuery('AccountAddress').for(
			drivers.profile_owner
		)
		if (!drivers || !address) throw new Error('Cannot find')

		const merge = { ...drivers, ...address[0] }
		delete merge.isDriver
		delete merge.profile_owner
		delete merge.address_owner

		res.status(200).json(merge)
	} catch (error) {
		next(error)
	}
})

//get user profile
router.get('/list/user/profile/:id', async (req, res, next) => {
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

		const user = await UserProfile.query().findById(id).where('isDriver', 0)
		const address = await Accounts.relatedQuery('AccountAddress').for(
			user.profile_owner
		)
		if (!user) throw new Error('Cannot find')

		const merge = { ...user, ...address[0] }
		delete merge.isDriver
		delete merge.profile_owner
		delete merge.address_owner

		res.status(200).json(merge)
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

// get user est entered data
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

//get travel log of logged in user
router.get('/list/account/travel/history/:user_id', async (req, res, next) => {
	const { user_id } = req.query
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

		const info = await TravelHistory.query()
			.withGraphJoined('UsersCompanion')
			.where('parent_id', user_id)

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
	} catch (error) {
		next(error)
	}
})

//get driver's passengers.
router.get('/list/driver/passengers/:driver_id', async (req, res, next) => {
	const { driver_id } = req.params,
		{ start, end, order } = req.query
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

		if (order) {
			const passengers = await TravelHistory.query()
				.withGraphJoined('GoingTo')
				.where('driver_id', driver_id)
				.orderBy(order, 'DESC')
			res.status(200).json(passengers)
		}

		if (start && end) {
			const passengers = await TravelHistory.query()
				.select('travel_history.travel_id', 'travel_history.destination')
				.withGraphJoined('GoingTo')
				.where('driver_id', driver_id)
				.whereBetween('time_boarded', [start, end])
			res.status(200).json(passengers)
		}

		if ((start && !end) || (!start && end) || !order) {
			const passengers = await TravelHistory.query()
				.select('travel_history.travel_id', 'travel_history.destination')
				.withGraphJoined('GoingTo')
				.where('driver_id', driver_id)
			res.status(200).json(passengers)
		}
	} catch (error) {
		next(error)
	}
})
module.exports = router
