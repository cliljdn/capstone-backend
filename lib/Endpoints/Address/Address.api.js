const express = require('express')
const Accounts = require('../../../database/Model/account_table.model')
const AdminAccounts = require('../../../database/Model/AdminAccounts.model')
const jwt = require('../../Tokens/jwt')
const EmployeeProfile = require('../../../database/Model/EmployeeProfile.model')
const router = express.Router()

router.post('/account/create/address', async (req, res, next) => {
	const { lotNumber, barangay, city } = req.body

	try {
		const Address = {
			house_lot_number: lotNumber,
			barangay: barangay,
			city: city,
		}

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

		const findAccount = await Accounts.query().findById(decoded.id)
		if (findAccount === undefined) {
			const error = new Error('Cannot find account')
			throw error
		}
		if (findAccount.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		const insertAddress = await findAccount
			.$relatedQuery('AccountAddress')
			.insertGraph(Address)
			.then(() => {
				res.status(201).json({
					created: true,
					message: 'Success',
				})
			})
	} catch (error) {
		next(error)
	}
})

router.post('/admin/create/address', async (req, res, next) => {
	const { lotNumber, barangay, city } = req.body

	try {
		const Address = {
			house_lot_number: lotNumber,
			barangay: barangay,
			city: city,
		}
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

		const findAccount = await AdminAccounts.relatedQuery('Profile').for(
			decoded.id
		)

		if (findAccount === undefined) {
			const error = new Error('Cannot find account')
			throw error
		}
		if (findAccount.isActive === 0) {
			const error = new Error('Account is not yet verified')
			throw error
		}

		const insertAddress = await findAccount[0]
			.$relatedQuery('Address')
			.insertGraph(Address)
			.then(() => {
				res.status(201).json({
					created: true,
					message: 'Success',
				})
			})
	} catch (error) {
		next(error)
		console.error(error)
	}
})

router.post('/employee/create/address', async (req, res, next) => {
	const { lotNumber, barangay, city } = req.body

	try {
		const Address = {
			house_lot_number: lotNumber,
			barangay: barangay,
			city: city,
		}
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

		let account = await Accounts.relatedQuery('EmployeeProfile').for(decoded.id)

		console.log(account)
		if (account[0] === undefined) {
			const error = new Error('Cannot find account')
			throw error
		}

		const insertAddress = await account[0]
			.$relatedQuery('Address')
			.insertGraph(Address)
			.then(() => {
				res.status(201).json({
					created: true,
					message: 'Success',
				})
			})
	} catch (error) {
		next(error)
		console.error(error)
	}
})

module.exports = router
