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
			.orderBy('name', 'DESC')

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

		const temp_companionList = {
			estInformation: estInfo,
			employeeProfile: employeeName,
			companionList,
		}
		res.status(200).json(temp_companionList)
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

module.exports = router
