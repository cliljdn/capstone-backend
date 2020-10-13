const yup = require('yup')

module.exports = {
	JeepeyValidation: yup.object().shape({
		plate_number: yup.string().trim().min(7).max(7).required(),
		color: yup
			.string()
			.trim()
			.matches(
				/^(Blue|Red|Yellow|Orange|Brown|White brown|Green|Yellow Blue|White Green|White)$/,
				'No such Jeepney Color'
			)
			.required(),
		vehicle_type: yup
			.string()
			.trim()
			.matches(/^(Jeepney|Tricycle)$/, 'Invalid Vehicle Type in Olongapo')
			.required(),
		body_number: yup.string().trim().min(4).max(4).required(),
	}),

	TricycleValidation: yup.object().shape({
		plate_number: yup.string().trim().min(7).max(7).required(),
		color: yup
			.string()
			.trim()
			.matches(/^(Blue|Orange|Green)$/, 'No such Tricyle Color in Olongapo')
			.required(),
		vehicle_type: yup
			.string()
			.trim()
			.matches(/^(Jeepney|Tricycle)$/, 'Invalid Vehicle Type')
			.required(),
		body_number: yup.string().trim().min(4).max(4).required(),
	}),
}
