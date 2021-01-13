const express = require('express')
const { decode } = require('jsonwebtoken')
const Accounts = require('../../../../database/Model/account_table.model')
const jwt = require('../../../Tokens/jwt')
const router = express.Router()

router.get('/employee/scanned', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid Token')

		const profile = await Accounts.relatedQuery('UserProfile').for(decoded.id)
		console.log(profile)
	} catch (err) {
		next(err)
	}
})

module.exports = router
