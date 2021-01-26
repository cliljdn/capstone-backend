const express = require('express')

const Accounts = require('../../../../database/Model/account_table.model')
const jwt = require('../../../Tokens/jwt')
const router = express.Router()
const UserProfile = require('../../../../database/Model/UserProfile.model')
const TableNames = require('../../../contants/TableNames')
const EmployeeScanned = require('../../../../database/Model/EmployeeScanned.model')
const Establishment = require('../../../../database/Model/establishment.model')
const TravelHistory = require('../../../../database/Model/travelhistory.model')
const {
	removeDuplicates,
} = require('../../../../database/Controllers/UserController')
const DriverVehicles = require('../../../../database/Model/Vehicle.model')
const { user_profile, travel_history } = require('../../../contants/TableNames')
const { knex } = require('../../../../database/Model/Vehicle.model')

// LIST OF ESTABLISHMENT For Indiv
router.get('/accounts/list/est/entered', async (req, res, next) => {
	let {
		page,
		order,
		startDate,
		start,
		end,
		filterMonth,
		filterDay,
		filterYear,
		search,
	} = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)

		if (!page) page = 0

		let listEmployees = await EmployeeScanned.query()
			.withGraphJoined('estList')
			.where(`${TableNames.employee_scanned}.account_id`, decoded.id)
			.groupBy('batch')
			.page(page, 6)
			.modify((list) => {
				if (search) {
					list
						.where('name', 'like', `%${search}%`)
						.orWhere('street', 'like', `%${search}%`)
						.orWhere('est_owner', 'like', `%${search}%`)
						.orWhere('time_entered', 'like', `%${search}%`)
						.orWhere('date_entered', 'like', `%${search}%`)
				}

				if (filterYear) {
					list.whereRaw('year(date_entered) = ?', filterYear)
				}

				if (filterMonth) {
					list.whereRaw('month(date_entered) = ?', filterMonth)
				}

				if (filterDay) {
					list.whereRaw('day(date_entered) = ?', filterDay)
				}

				if (order) {
					list.orderBy(order, 'ASC')
				}

				if (startDate && start && end) {
					list
						.whereBetween('time_entered', [start, end])
						.andWhere('date_entered', startDate)
						.orderBy('time_entered', 'ASC')
						.orderBy('date_entered', 'ASC')
				}

				if (startDate) {
					list.where('date_entered', startDate)
				}

				if (start && end) {
					list.whereBetween('time_entered', [start, end])
				}
			})

		const getBydate = await EmployeeScanned.query()
			.groupBy('batch')
			.where('account_id', decoded.id)
			.select('date_entered')
			.orderBy('date_entered', 'ASC')

		const merge = {
			listEmployees,
			dates: getBydate,
		}

		res.status(200).json(merge)
	} catch (err) {
		next(err)
	}
})

// EST ENTERED INFO BY BATCH
router.get('/accounts/list/est/entered/:batch', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)

		const companionList = await EmployeeScanned.query().where(
			'batch',
			req.params.batch
		)

		const getBatchnum = removeDuplicates(companionList)

		const employeeName = await UserProfile.query().findById(
			getBatchnum[0].employee_id
		)
		const estInfo = await Establishment.query().findById(getBatchnum[0].est_id)

		const scannedData = {
			estInformation: estInfo,
			employeeProfile: employeeName,
			companionList,
		}
		res.status(200).json(scannedData)
	} catch (err) {
		next(err)
	}
})

//LIST OF TRAVEL HISTORY
router.get('/accounts/list/travelhistory', async (req, res, next) => {
	let {
		page,
		order,
		startDate,
		start,
		filterMonth,
		filterDay,
		filterYear,
		end,
		search,
	} = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)
		if (!userAccount) throw new Error('No profile for this user')

		const travelHistory = await TravelHistory.query()
			.groupBy('batch')
			.where('account_id', decoded.id)
			.modify((list) => {
				if (search) {
					list
						.where('destination', 'like', `%${search}%`)
						.orWhere('date_boarded', 'like', `%${search}%`)
						.orWhere('time_boarded', 'like', `%${search}%`)
				}

				if (order) {
					list.orderBy(order, 'ASC')
				} else {
					list.orderBy('date_boarded', 'DESC')
				}

				if (filterYear) {
					list.whereRaw('year(date_boarded) = ?', filterYear)
				}

				if (filterMonth) {
					list.whereRaw('month(date_boarded) = ?', filterMonth)
				}

				if (filterDay) {
					list.whereRaw('day(date_boarded) = ?', filterDay)
				}

				if (startDate && start && end) {
					list
						.whereBetween('time_boarded', [start, end])
						.andWhere('date_boarded', startDate)
				}

				if (startDate) {
					list.where('date_boarded', startDate)
				}

				if (start && end) {
					list.whereBetween('time_boarded', [start, end])
				}
			})

		const getBydate = await TravelHistory.query()
			.groupBy('batch')
			.where('account_id', decoded.id)
			.select('date_boarded')

		const merge = {
			travelHistory,
			dates: getBydate,
		}

		res.status(200).json(merge)
	} catch (error) {
		next(error)
	}
})

//GET TRAVEL HISTORY BY BATCH
router.get('/accounts/list/travelhistory/:batch', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)
		if (!userAccount) throw new Error('No profile for this user')

		const travelHistory = await TravelHistory.query().where(
			'batch',
			req.params.batch
		)

		const refId = removeDuplicates(travelHistory)
		const driver = await UserProfile.query().where(
			'account_id',
			refId[0].driver_id
		)

		const vehicle = await DriverVehicles.query().findById(refId[0].plate_number)

		const getBybatch = {
			driverInfo: driver[0],
			vehicleInfo: vehicle,
			travelHistory,
		}

		res.status(200).json(getBybatch)
	} catch (error) {
		next(error)
	}
})

//LIST OF DRIVERS VEHICLES
router.get('/accounts/driver/vehicles', async (req, res, next) => {
	let { page, order, search } = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const driverAccount = await Accounts.query().findById(decoded.id)
		if (!driverAccount) throw new Error(null)

		const active = await DriverVehicles.query()
			.where('account_id', decoded.id)
			.page(page, 100)
			.modify((list) => {
				if (search) {
					list
						.where('plate_number', 'like', `%${search}%`)
						.orWhere('color', 'like', `%${search}%`)
						.orWhere('vehicle_type', 'like', `%${search}%`)
						.orWhere('body_number', 'like', `%${search}%`)
						.orWhere('vehicle_route', 'like', `%${search}%`)
				}

				if (order) {
					list.orderBy(order, 'asc')
				}
			})
		res.status(200).json(active)
	} catch (error) {
		next(error)
	}
})

//GET 1 OF DRIVERS VEHICLES
router.get('/accounts/driver/vehicles/:vehicle_id', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const driverAccount = await Accounts.query().findById(decoded.id)
		if (!driverAccount) throw new Error(null)

		const vehicleInfo = await DriverVehicles.query().findById(
			req.params.vehicle_id
		)

		res.status(200).json(vehicleInfo)
	} catch (error) {
		next(error)
	}
})

router.get('/accounts/est/employees', async (req, res, next) => {
	let { page, order, search } = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const estAccount = await Accounts.query().findById(decoded.id)
		if (!estAccount) throw new Error(null)

		const employees = await UserProfile.query()
			.where('account_id', decoded.id)
			.page(page, 100)
			.modify((list) => {
				if (search) {
					list
						.where('firstname', 'like', `%${search}%`)
						.orWhere('lastname', 'like', `%${search}%`)
						.orWhere('middlename', 'like', `%${search}%`)
						.orWhere('birthday', 'like', `%${search}%`)
						.orWhere('contactnumber', 'like', `%${search}%`)
				}

				if (order) {
					list.orderBy(order, 'asc')
				}
			})

		res.status(200).json(employees)
	} catch (error) {
		next(error)
	}
})

// Get Infomation of Emp
router.get('/accounts/est/employees/:emp_id', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const estAccount = await Accounts.query().findById(decoded.id)
		if (!estAccount) throw new Error(null)

		const employees = await UserProfile.query()
			.findById(req.params.emp_id)
			.andWhere('account_id', decoded.id)
		if (!employees) throw new Error(null)

		res.status(200).json(employees)
	} catch (error) {
		next(error)
	}
})

// get list of scanned in est
router.get('/accounts/est/scanned', async (req, res, next) => {
	let { page, order, startDate, start, end, search } = req.query
	try {
		console.log(req.query)
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const estAccount = await Accounts.query().findById(decoded.id)
		if (!estAccount) throw new Error(null)
		const estInfo = await Establishment.query().where('account_id', decoded.id)

		if (!page) page = 0

		const scannedIndiv = await EmployeeScanned.query()
			.withGraphJoined('scannedIndiv')
			.where('est_id', estInfo[0].est_id)
			.groupBy('batch')
			.page(page, 6)
			.modify((list) => {
				if (search) {
					list.where(function (qry) {
						qry
							.where('scannedIndiv.firstname', 'like', `%${search}%`)
							.orWhere('scannedIndiv.middlename', 'like', `%${search}%`)
							.orWhere('scannedIndiv.lastname', 'like', `%${search}%`)
							.orWhere('date_entered', 'like', `%${search}%`)
							.orWhere('time_entered', 'like', `%${search}%`)
					})
				}

				if (order) {
					list.orderBy(`${order}`, 'asc')
				} else {
					list.orderBy('date_entered', 'desc')
				}

				if (startDate && start && end) {
					list
						.whereBetween('time_entered', [start, end])
						.andWhere('date_entered', startDate)
				}

				if (startDate) {
					list.where('date_entered', startDate)
				}

				if (start && end) {
					list.whereBetween('time_entered', [start, end])
				}
			})

		const enterdDates = await EmployeeScanned.query()
			.groupBy('batch')
			.where('est_id', estInfo[0].est_id)
			.orderBy('date_entered', 'ASC')
			.select('date_entered')

		const merge = {
			dates: enterdDates,
			scannedIndiv,
		}

		res.status(200).json(merge)
	} catch (error) {
		next(error)
	}
})

//list of driver's passengers
router.get('/accounts/driver/passenger', async (req, res, next) => {
	let { page, order, startDate, start, end, search } = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const passengers = await TravelHistory.query()
			.withGraphJoined('passengerInfo')
			.where('driver_id', decoded.id)
			.groupBy('batch')
			.page(page, 6)
			.modify((list) => {
				if (search) {
					list.where(function (qry) {
						qry
							.where('passengerInfo.firstname', 'like', `%${search}%`)
							.orWhere('passengerInfo.middlename', 'like', `%${search}%`)
							.orWhere('passengerInfo.lastname', 'like', `%${search}%`)
					})
				}

				if (order) {
					list.orderBy(`passengerInfo.${order}`, 'asc')
				} else {
					list.orderBy('date_boarded', 'desc')
				}

				if (startDate && start && end) {
					list
						.whereBetween('time_boarded', [start, end])
						.andWhere('date_boarded', startDate)
				}

				if (start && end) {
					list.whereBetween('time_boarded', [start, end])
				}
			})
		console.log(passengers)
		res.status(200).json(passengers)
	} catch (error) {
		next(error)
	}
})

router.get('/accounts/driver/passenger/:batch', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const passengers = await TravelHistory.query().where(
			'batch',
			req.params.batch
		)

		const refId = removeDuplicates(passengers)
		const driver = await UserProfile.query().where(
			'account_id',
			passengers[0].driver_id
		)
		const vehicle = await DriverVehicles.query().findById(refId[0].plate_number)

		const mainList = {
			driver: driver[0],
			vehicle,
			companions: passengers,
		}

		res.status(200).json(mainList)
	} catch (error) {
		next(error)
	}
})

module.exports = router
