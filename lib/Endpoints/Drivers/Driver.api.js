const express = require('express')
const router = express.Router()
const DriverProfile = require('../../../database/Model/DriverProfile.model')
const Accounts = require('../../../database/Model/account_table.model')
const TravelHistory = require('../../../database/Model/TravelHistory.model')
const {
	JeepeyValidation,
	TricycleValidation,
} = require('../../Validations/Drivers/VehiclesValidation')
const bcrypt = require('bcrypt')
const jwt = require('../../Tokens/jwt')
const { passengers } = require('../../contants/TableNames')

router.post('/driver/create/passenger', async (req, res, next) => {
	const { travel_id } = req.body

	try {
		const passengers = {
			travel_id: travel_id,
		}

		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token Provided')
			throw error
		}

		//verifies driver token
		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid Token')
			throw error
		}

		//finds the driver account
		const findDriver = await Accounts.query().findById(decoded.id)
		const findProfile = await findDriver.$relatedQuery('DriverProfile')
		if (findDriver === undefined) {
			const error = new Error('Cannot find Account')
			throw error
		} else if (findProfile === undefined) {
			const error = new Error('Cannot find profile')
			throw error
		}

		if (findDriver.account_type !== 'Driver') {
			const error = new Error('Invalid Account Type')
			throw error
		}

		const findTravelHistory = await TravelHistory.query().findById(
			passengers.travel_id
		)
		if (findTravelHistory === undefined) {
			const error = new Error('No travel credentials')
			throw error
		}
		if (findTravelHistory.isCompanion === 1) {
			const error = new Error('Travel id must be a parent id')
			throw error
		}

		const loadCompanion = await findTravelHistory.$relatedQuery('Companions')
		const isOk = await DriverProfile.relatedQuery('DriverIdentitifier')
			.for(findProfile.driver_id)
			.insertGraph({
				travel_id: findTravelHistory.travel_id,
				account_id: findTravelHistory.account_id,
			})

		for (const companions of loadCompanion) {
			await DriverProfile.relatedQuery('DriverIdentitifier')
				.for(findProfile.driver_id)
				.insertGraph({
					travel_id: findTravelHistory.travel_id,
					account_id: companions.account_id,
				})
		}

		res.status(201).json({
			created: true,
			message: 'inserted',
		})
	} catch (error) {
		next(error)
	}
})

//creates data for vehicle
router.post('/driver/create/vehicle', async (req, res, next) => {
	const { plateNumber, color, type, body_number } = req.body
	try {
		const vehicleData = {
			plate_number: plateNumber,
			color: color,
			vehicle_type: type,
			isActive: false,
			body_number: body_number,
		}
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No Token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token')
			throw error
		}
		if (vehicleData.vehicle_type === 'Jeepney') {
			await JeepeyValidation.validate(
				{
					plate_number: vehicleData.plate_number,
					color: vehicleData.color,
					vehicle_type: vehicleData.vehicle_type,
					body_number: vehicleData.body_number,
				},
				{ abortEarly: false }
			)
		} else if (vehicleData.vehicle_type === 'Tricycle') {
			await TricycleValidation.validate(
				{
					plate_number: vehicleData.plate_number,
					color: vehicleData.color,
					vehicle_type: vehicleData.vehicle_type,
					body_number: vehicleData.body_number,
				},
				{ abortEarly: false }
			)
		} else {
			const error = new Error('Invalid Vehicle Type')
			throw error
		}

		const driverAcc = await Accounts.query().findById(decoded.id)
		if (driverAcc === undefined) {
			const error = new Error('no such account')
			throw error
		}
		if (driverAcc.account_type !== 'Driver') {
			const error = new Error('Driver account can enter a vehicle')
			throw error
		}

		const profile = await driverAcc.$relatedQuery('DriverProfile')
		if (profile) {
			const vehicles = await DriverProfile.relatedQuery('DriverVehicles').for(
				profile.driver_id
			)

			for (let i = 0; i < vehicles.length; i++) {
				if (
					vehicles[i].plate_number === vehicleData.plate_number &&
					vehicles[i].vehicle_owner === profile.driver_id &&
					vehicles[i].body_number === vehicleData.body_number
				) {
					const error = new Error(
						'this vehicle is already registered to the driver'
					)
					throw error
				}
			}

			await DriverProfile.relatedQuery('DriverVehicles')
				.for(profile.driver_id)
				.insert(vehicleData)
				.then(() => {
					res.status(201).json({
						created: true,
						message: 'created',
					})
				})
		}
	} catch (error) {
		next(error)
	}
})

// activates the vehicle
router.patch('/driver/activate/vehicle/:vehicle_id', async (req, res, next) => {
	const { vehicle_id } = req.params
	try {
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token.')
			throw error
		}

		const account = await Accounts.query().findById(decoded.id)
		if (account === undefined) {
			const error = new Error('cannot find account')
			throw error
		}
		if (account.account_type !== 'Driver') {
			const error = new Error('Invalid account type')
			throw error
		}

		const profile = await account.$relatedQuery('DriverProfile')
		if (profile) {
			const vehicle = await DriverProfile.relatedQuery('DriverVehicles')
				.for(profile.driver_id)
				.where('vehicle_id', vehicle_id)
				.where('isActive', false)

			if (vehicle[0] === undefined) {
				const error = new Error('no such vehicle')
				throw error
			}

			if (vehicle[0].isActive === undefined) {
				const error = new Error('no such vehicle')
				throw error
			}

			await DriverProfile.relatedQuery('DriverVehicles')
				.for(profile.driver_id)
				.where('vehicle_id', vehicle_id)
				.patch({
					isActive: true,
				})
				.then(() => {
					res.status(201).json({
						Activated: true,
						message: 'Activated',
					})
				})
		}
	} catch (error) {
		next(error)
	}
})
// deactivates the vehicle
router.patch('/driver/deactivate/:vehicle_id', async (req, res, next) => {
	const { vehicle_id } = req.params
	try {
		const auth = req.headers['authorization']
		if (!auth) {
			const error = new Error('No token provided')
			throw error
		}

		const decoded = await jwt.verify(auth)
		if (!decoded) {
			const error = new Error('Invalid token.')
			throw error
		}

		const account = await Accounts.query().findById(decoded.id)
		if (account === undefined) {
			const error = new Error('cannot find account')
			throw error
		}
		if (account.account_type !== 'Driver') {
			const error = new Error('Invalid account type')
			throw error
		}

		const profile = await account.$relatedQuery('DriverProfile')
		if (profile) {
			const vehicle = await DriverProfile.relatedQuery('DriverVehicles')
				.for(profile.driver_id)
				.where('vehicle_id', vehicle_id)

			if (vehicle.length === 0) {
				const error = new Error('no such vehicle')
				throw error
			}

			if (vehicle[0].isActive === 0) {
				const error = new Error('The vehicle is already deactivated')
				throw error
			}

			await DriverProfile.relatedQuery('DriverVehicles')
				.for(profile.driver_id)
				.where('vehicle_id', vehicle_id)
				.patch({
					isActive: false,
				})
				.then(() => {
					res.status(201).json({
						Deactivated: true,
						message: 'Deactivated',
					})
				})
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
