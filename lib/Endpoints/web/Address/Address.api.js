const express = require('express')
const Accounts = require('../../../../database/Model/account_table.model')

const jwt = require('../../../Tokens/jwt')
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

		const ifExist = await findAccount
			.$relatedQuery('AccountAddress')
			.for(decoded.id)
		if (ifExist) throw new Error('User already have profile')

		const insertAddress = await findAccount
			.$relatedQuery('AccountAddress')
			.insertGraph(Address)

		res.status(201).json({
			created: true,
			message: 'Success',
		})
	} catch (error) {
		next(error)
	}
})

router.patch('/account/update/address', async (req, res, next) => {
	try {
		Object.keys(req.body).forEach((key) =>
			req.body[key] === '' ? (req.body[key] = undefined) : {}
		)

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

		await findAccount.$relatedQuery('AccountAddress').patch(req.body)

		res.status(201).json({
			created: true,
			message: 'Success',
		})
	} catch (error) {
		next(error)
	}
})

module.exports = router
