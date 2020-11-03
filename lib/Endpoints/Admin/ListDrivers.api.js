const express = require('express')
const router = express.Router()
const UserProfile = require('../../../database/Model/UserProfile.model')

router.get('/list/drivers', async (req, res, next) => {
	try {
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

		const drivers = await UserProfile.query().where('isDriver', 1)
		res.status(200).json(drivers)
	} catch (error) {
		next(error)
	}
})
module.exports = router
