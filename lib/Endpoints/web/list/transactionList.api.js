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
const { user_profile } = require('../../../contants/TableNames')

// LIST OF ESTABLISHMENT
router.get('/accounts/list/est/entered', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)

		const listEmployees = await EmployeeScanned.query()
			.withGraphJoined('estList')
			.where(`${TableNames.employee_scanned}.account_id`, decoded.id)

		res.status(200).json(removeDuplicates(listEmployees))
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
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const userAccount = await Accounts.query().findById(decoded.id)
		if (!userAccount) throw new Error('No profile for this user')

		const travelHistory = await TravelHistory.query().where(
			'account_id',
			userAccount.account_id
		)
		console.log(removeDuplicates(travelHistory))
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
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const driverAccount = await Accounts.query().findById(decoded.id)
		if (!driverAccount) throw new Error(null)

		const active = await DriverVehicles.query().where('account_id', decoded.id)

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
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const estAccount = await Accounts.query().findById(decoded.id)
		if (!estAccount) throw new Error(null)

		const employees = await UserProfile.query().where('account_id', decoded.id)

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
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const estAccount = await Accounts.query().findById(decoded.id)
		if (!estAccount) throw new Error(null)
		const estInfo = await Establishment.query().where('account_id', decoded.id)

		const scannedIndiv = await EmployeeScanned.query()
			.withGraphJoined('scannedIndiv')
			.where('est_id', estInfo[0].est_id)

		res.status(200).json(removeDuplicates(scannedIndiv))
	} catch (error) {
		next(error)
	}
})
module.exports = router
