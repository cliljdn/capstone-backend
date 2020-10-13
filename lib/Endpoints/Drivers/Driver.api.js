const express = require('express')
const router = express.Router()
const DriverProfile = require('../../../database/Model/DriverProfile.model')
const Accounts = require('../../../database/Model/account_table.model')
const {
	JeepeyValidation,
	TricycleValidation,
} = require('../../Validations/Drivers/VehiclesValidation')
const bcrypt = require('bcrypt')
const jwt = require('../../Tokens/jwt')

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
			const Vehicle = await DriverProfile.relatedQuery('DriverVehicles').for(
				profile.driver_id
			)
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
