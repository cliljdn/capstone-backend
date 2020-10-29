const express = require('express')
const router = express.Router()
const jwt = require('../../Tokens/jwt')
const {
	AdminRegister,
} = require('../../Validations/Accounts/AccountValidation')
const AdminAccount = require('../../../database/Model/AdminAccounts.model')
const AdminProfile = require('../../../database/Model/AdminProfile.model')
const Accounts = require('../../../database/Model/account_table.model')
router.post('/admin/create/account', async (req, res, next) => {
	const { email, password, account_type } = req.body

	try {
		const adminEntry = {
			email: email,
			password: password,
		}

		await AdminRegister.validate(adminEntry, { abortEarly: false })
		const ifExist = await AdminAccount.query().where('email', adminEntry.email)
		const checkIfTampered = await Accounts.query().where(
			'email',
			adminEntry.email
		)
		if (ifExist || checkIfTampered) {
			const error = new Error('Email is already registered')
			throw error
		}

		res.status(201).json(true)
	} catch (error) {
		next(error)
	}
})

module.exports = router
