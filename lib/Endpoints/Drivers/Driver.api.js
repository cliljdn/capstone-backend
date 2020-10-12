const express = require('express')
const router = express.Router()
const DriverProfile = require('../../../database/Model/DriverProfile.model')
const Accounts = require('../../../database/Model/account_table.model')
const VehicleValidation = require('../../Validations/Drivers/VehiclesValidation')

router.post('/driver/create/vehicle', async (req, res, next) => {
	const { plateNumber, color, type, body_number } = req.body
	try {
		const vehicleData = {
			plate_number: plateNumber,
			color: color,
			vehicle_type: type,
			body_number: body_number,
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
