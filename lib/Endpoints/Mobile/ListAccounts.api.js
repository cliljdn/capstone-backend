const express = require('express')
const router = express.Router()
const Accounts = require('../../../database/Model/account_table.model')
const UserProfile = require('../../../database/Model/UserProfile.model')
const jwt = require('../../Tokens/jwt')
const fs = require('fs').promises
// responds with the profile of the user
router.get('/list/account/login/profile', async (req, res, next) => {
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

		const account = await Accounts.query().findById(decoded.id)
		const address = await account.$relatedQuery('AccountAddress')

		if (account === undefined) throw new Error('Account is not registered')

		if (account.isActive === 0) throw new Error('Account is not yet verified')

		const profile = await account.$relatedQuery('UserProfile')
		const merge = { ...profile, ...address }
		res.status(200).json(merge)
	} catch (error) {
		next(error)
	}
})

// list of logged in drivers vehicle
router.get('/list/account/driver/vehicle', async (req, res, next) => {
	try {
		//sends token to request a vehicle of the driver
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

		const profile = await UserProfile.relatedQuery('DriverVehicles').for(
			decoded.id
		)

		if (profile === undefined || profile === null) {
			const error = new Error('cannot find account')
			throw error
		}

		res.status(200).json(profile)
	} catch (error) {
		next(error)
	}
})

router.get('/download/scanolongapo', async (req, res, next) => {
	try {
		let path = `${__dirname}/hello.txt`
		const file = await fs.readFile(path)
		response.pipe(file)
	} catch (err) {
		next(err.reponse)
	}
})

module.exports = router
