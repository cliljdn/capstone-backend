const yup = require('yup')

module.exports = {
	registerValidation: yup.object().shape({
		email: yup.string().trim().email().required(),
		password: yup
			.string()
			.trim()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
			)
			.required(),
		account_type: yup
			.string()
			.trim()
			.matches(
				/^(User|Driver|Employee)$/,
				'User, Driver, Employee account types are only allowed'
			)
			.required(),
	}),

	loginValidation: yup.object().shape({
		email: yup.string().trim().email().required(),
		password: yup
			.string()
			.trim()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
			)
			.required(),
	}),
}
