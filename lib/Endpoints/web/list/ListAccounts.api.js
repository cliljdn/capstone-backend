const express = require('express')
const router = express.Router()
const Accounts = require('../../../../database/Model/account_table.model')
const UserProfile = require('../../../../database/Model/UserProfile.model')
const jwt = require('../../../Tokens/jwt')
const fs = require('fs').promises
const Vechicles = require('../../../../database/Model/Vehicle.model')
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

		if (account.account_type === 'Individual') {
			const profile = await account.$relatedQuery('UserProfile')
			delete address.user_id

			const merge = { ...account, ...profile, ...address }

			res.status(200).json(merge)
		} else if (account.account_type === 'Driver') {
			const profile = await account.$relatedQuery('UserProfile')
			delete address.user_id

			const vehicle = await Vechicles.query()
				.where('account_id', decoded.id)
				.andWhere('isActive', 1)

			const merge = { ...account, ...profile, ...address, ...vehicle[0] }

			res.status(200).json(merge)
		} else {
			const profile = await account.$relatedQuery('EstProfile')

			const merge = { ...account, ...profile }
			res.status(200).json(merge)
		}
	} catch (error) {
		next(error)
	}
})

router.get('/list/user/account', async (req, res, next) => {
	try {
		const auth = req.headers['authorization']
		if (!auth) throw new Error('No token provided')

		const decoded = await jwt.verify(auth)
		if (!decoded) throw new Error('Invalid token')

		const account = await Accounts.query().findById(decoded.id)

		const dispatch = {
			name: account.account_id + '-' + account.account_type,
			accType: account.account_type,
			token: auth,
			isActive: account.isActive,
			email: account.email,
		}

		res.status(200).json(dispatch)
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

router.get('/download/scanolongapo/:file(*)', (req, res, next) => {
	const file = req.params.file
	try {
		// const fileLocation = path.join('./Mobile', file)
		const fileLocation = __dirname + `/${file}`

		res.download(fileLocation, file, (err) => {
			return err ? err : true
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router
