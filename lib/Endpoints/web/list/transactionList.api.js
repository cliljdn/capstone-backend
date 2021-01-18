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

module.exports = router
