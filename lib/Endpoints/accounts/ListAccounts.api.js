const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()
const Accounts = require('../../../database/Model/account_table.model')
const jwt = require('../../Tokens/jwt')

router.get('/list/accounts/profile', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
