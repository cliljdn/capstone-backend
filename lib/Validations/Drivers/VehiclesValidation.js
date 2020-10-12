const yup = require('yup')

module.exports = {
	vehicleValidation: yup.object().shape({
		plate_number: yup.string().trim().min(7).required(),
		color: yup.string().trim().required(),
		vehicle_type: yup
			.string()
			.trim()
			.matches(/^(User|Driver|Employee)$/, 'Invalid Vehicle Type')
			.required(),
		body_number: yup.string().trim().required(),
	}),
}
