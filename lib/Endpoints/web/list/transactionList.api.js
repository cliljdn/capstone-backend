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
const Address = require('../../../../database/Model/Address.model')
const locationsSuggest = require('../../../../database/Model/locations.model')

function changeValue(selectList) {
	switch (selectList) {
		case 'Date Entered':
			return selectList.split(' ').join('_').toLowerCase()

		case 'Time Entered':
			return selectList.split(' ').join('_').toLowerCase()

		case 'Establishment Name':
			return selectList.split(' ')[1].toLowerCase()

		case 'Employee Name':
			return 'firstname'

		case 'Individual Firstname':
			return selectList.split(' ')[1].toLowerCase()

		case 'Individual Lastname':
			return selectList.split(' ')[1].toLowerCase()

		default:
			return selectList.toLowerCase()
	}
}

function changeValuePassengers(selectList) {
	switch (selectList) {
		case 'Date Boarded':
			return selectList.split(' ').join('_').toLowerCase()

		case 'Time Boarded':
			return selectList.split(' ').join('_').toLowerCase()

		case 'Plate Number':
			return selectList.split(' ').join('_').toLowerCase()

		case 'Vehicle Route':
			return selectList.split(' ').join('_').toLowerCase()

		default:
			return selectList.toLowerCase()
	}
}

// LIST OF ESTABLISHMENT For Indiv
router.get('/accounts/list/est/entered', async (req, res, next) => {
	let { page, order, start, end, startDate, endDate, search } = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)

		const listEmployees = await EmployeeScanned.query()
			.withGraphJoined({
				estName: true,
			})
			.select(
				'estName.name',
				'estName.street',
				'estName.image',
				'estName.est_owner',
				'date_entered',
				'time_entered',
				'batch'
			)
			.where(`${TableNames.employee_scanned}.account_id`, decoded.id)
			.groupBy('batch')
			.modify((list) => {
				if (page) {
					list.page(page, 6)
				} else {
					list.page(0, 1000)
				}

				if (search) {
					list
						.where('name', 'like', `%${search}%`)
						.orWhere('street', 'like', `%${search}%`)
						.orWhere('est_owner', 'like', `%${search}%`)
						.orWhere('time_entered', 'like', `%${search}%`)
						.orWhere('date_entered', 'like', `%${search}%`)
				}

				if (order) {
					list.orderBy(changeValue(order), 'ASC')
				}

				if (start && !end) {
					list
						.where('time_entered', start)
						.orderBy('time_entered', 'ASC')
						.orderBy('date_entered', 'ASC')
				}

				if (end && !start) {
					list
						.where('time_entered', end)
						.orderBy('time_entered', 'ASC')
						.orderBy('date_entered', 'ASC')
				}

				if (start && end) {
					list
						.whereBetween('time_entered', [start, end])
						.orderBy('time_entered', 'ASC')
						.orderBy('date_entered', 'ASC')
				}

				if (startDate && !endDate) {
					list.where('date_entered', startDate)
				}

				if (endDate && !startDate) {
					list.where('date_entered', endDate)
				}

				if (startDate && endDate) {
					list
						.whereBetween('date_entered', [startDate, endDate])
						.orderBy('time_entered', 'ASC')
						.orderBy('date_entered', 'ASC')
				}
			})

		for (const list of listEmployees.results) {
			if (!page) {
				delete list.image
			}
			delete list.estName
		}

		res.status(200).json(listEmployees)
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
	let { page, order, start, startDate, endDate, end, search } = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)
		if (!userAccount) throw new Error('No profile for this user')

		const travelHistory = await TravelHistory.query()
			.groupBy('batch')
			.select(
				'batch',
				'plate_number',
				'date_boarded',
				'time_boarded',
				'destination',
				'account_id'
			)
			.where('account_id', decoded.id)
			.modify((list) => {
				if (page) {
					list.page(page, 6)
				} else {
					list.page(0, 1000)
				}

				if (search) {
					list
						.where('destination', 'like', `%${search}%`)
						.orWhere('date_boarded', 'like', `%${search}%`)
						.orWhere('time_boarded', 'like', `%${search}%`)
				}

				if (order) {
					list.orderBy(changeValuePassengers(order), 'ASC')
				} else {
					list.orderBy('date_boarded', 'DESC')
				}

				if (startDate && endDate) {
					list.whereBetween('date_boarded', [startDate, endDate])
				}

				if (startDate && !endDate) {
					list.where('date_boarded', startDate)
				}

				if (endDate && !startDate) {
					list.where('date_boarded', endDate)
				}

				if (start && !end) {
					list.where('time_boarded', start)
				}

				if (end && !start) {
					list.where('time_boarded', end)
				}

				if (start && end) {
					list.whereBetween('time_boarded', [start, end])
				}
			})

		res.status(200).json(travelHistory)
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
	let { page, order, startDate, start, end, endDate, search } = req.query
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const estAccount = await Accounts.query().findById(decoded.id)
		if (!estAccount) throw new Error(null)
		const estInfo = await Establishment.query().where('account_id', decoded.id)

		if (!page) page = 0

		const scannedIndiv = await EmployeeScanned.query()
			.withGraphJoined({
				scannedIndiv: true,
				presentEmployee: true,
			})
			.where('est_id', estInfo[0].est_id)
			.groupBy('batch')
			.select(
				'batch',
				'date_entered',
				'time_entered',
				'scannedIndiv.firstname',
				'scannedIndiv.lastname',
				'scannedIndiv.image'
			)
			.modify((list) => {
				if (page) {
					list.page(page, 6)
				} else {
					list.page(0, 1000)
				}

				if (search) {
					list.where(function (qry) {
						qry
							.where('scannedIndiv.firstname', 'like', `%${search}%`)
							.orWhere('scannedIndiv.lastname', 'like', `%${search}%`)
							.orWhere('date_entered', 'like', `%${search}%`)
							.orWhere('time_entered', 'like', `%${search}%`)
							.orWhere('presentEmployee.firstname', 'like', `%${search}%`)
							.orWhere('presentEmployee.lastname', 'like', `%${search}%`)
					})
				}

				if (order) {
					if (order === 'Employee Name') {
						list.orderBy(`presentEmployee.${changeValue(order)}`, 'asc')
					} else if (order.includes('Individual')) {
						list.orderBy(`scannedIndiv.${changeValue(order)}`, 'asc')
					} else {
						list.orderBy(`${changeValue(order)}`, 'asc')
					}
				} else {
					list.orderBy('date_entered', 'desc')
				}

				if (start && !end) {
					list.where('time_entered', start)
				}

				if (end && !start) {
					list.where('time_entered', end)
				}

				if (start && end) {
					list.whereBetween('time_entered', [start, end])
				}

				if (startDate && !endDate) {
					list.where('date_entered', startDate)
				}

				if (endDate && !startDate) {
					list.where('date_entered', endDate)
				}

				if (startDate && endDate) {
					list.whereBetween('date_entered', [startDate, endDate])
				}
			})

		for (const indiv of scannedIndiv.results) {
			delete indiv.scannedIndiv
		}

		res.status(200).json(scannedIndiv)
	} catch (error) {
		next(error)
	}
})

// get info of scanned in est per batch
router.get('/accounts/est/scanned/:batch', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const estAccount = await Accounts.query().findById(decoded.id)
		if (!estAccount) throw new Error(null)
		const estInfo = await Establishment.query().where('account_id', decoded.id)

		const scannedIndiv = await EmployeeScanned.query().where(
			'batch',
			req.params.batch
		)

		const employee = await UserProfile.query().findById(
			scannedIndiv[0].employee_id
		)

		const empAddress = await Address.query().where(
			'account_id',
			employee.account_id
		)

		const indiv = await UserProfile.query().where(
			'account_id',
			scannedIndiv[0].account_id
		)

		const indivAddress = await Address.query().where(
			'account_id',
			indiv[0].account_id
		)

		const merge = {
			info: {
				date_entered: scannedIndiv[0].date_entered,
				time_entered: scannedIndiv[0].time_entered,
			},
			employee: {
				...employee,
				...empAddress[0],
			},
			scannedIndiv,
			indiv: {
				...indiv[0],
				...indivAddress[0],
			},
		}

		res.status(200).json(merge)
	} catch (error) {
		next(error)
	}
})

//list of driver's passengers
router.get('/accounts/driver/passenger', async (req, res, next) => {
	let { page, order, startDate, endDate, start, end, search } = req.query

	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const passengers = await TravelHistory.query()
			.withGraphJoined({
				passengerInfo: true,
				currentVehicle: true,
			})
			.select(
				'batch',
				'destination',
				'currentVehicle.plate_number',
				'currentVehicle.vehicle_route',
				'date_boarded',
				'time_boarded'
			)
			.where('driver_id', decoded.id)
			.groupBy('batch')
			.page(page, 6)
			.modify((list) => {
				if (page) {
					list.page(page, 6)
				} else {
					list.page(0, 1000)
				}

				if (search) {
					list.where(function (qry) {
						qry
							.where('currentVehicle.plate_number', 'like', `%${search}%`)
							.orWhere('currentVehicle.vehicle_route', 'like', `%${search}%`)
							.orWhere('destination', 'like', `%${search}%`)
							.orWhere('date_boarded', 'like', `%${search}%`)
							.orWhere('time_boarded', 'like', `%${search}%`)
					})
				}

				if (order) {
					if (
						order === 'Time Boarded' ||
						order === 'Date Boarded' ||
						order === 'Destination'
					) {
						list.orderBy(`${changeValuePassengers(order)}`, 'asc')
					} else if (order === 'Vehicle Route' || order === 'Plate Number') {
						list.orderBy(
							`currentVehicle.${changeValuePassengers(order)}`,
							'asc'
						)
					} else {
						list.orderBy(`passengerInfo.${changeValuePassengers(order)}`, 'asc')
					}
				} else {
					list.orderBy('date_boarded', 'desc')
				}

				if (start && !end) {
					list.where('time_boarded', start)
				}

				if (!start && end) {
					list.where('time_boarded', end)
				}

				if (startDate && !endDate) {
					list.where('date_boarded', startDate)
				}

				if (endDate && !startDate) {
					list.where('date_boarded', endDate)
				}

				if (startDate && endDate) {
					list.whereBetween('date_boarded', [startDate, endDate])
				}

				if (start && end) {
					list.whereBetween('time_boarded', [start, end])
				}
			})

		for (const list of passengers.results) {
			delete list.passengerInfo
			delete list.currentVehicle
		}

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
		const parentAccount = await UserProfile.query().where(
			'account_id',
			refId[0].account_id
		)
		const vehicle = await DriverVehicles.query().findById(refId[0].plate_number)

		const mainList = {
			parentAccount: parentAccount[0],
			vehicle,
			companions: passengers,
		}

		res.status(200).json(mainList)
	} catch (error) {
		next(error)
	}
})

router.get('/suggest', async (req, res, next) => {
	try {
		const dataSuggest = await locationsSuggest
			.query()
			.select('barangay')
			.whereNot('barangay', null)
			.andWhereNot('barangay', '')

		res.status(200).json(dataSuggest)
	} catch (error) {
		next(error)
	}
})
module.exports = router
