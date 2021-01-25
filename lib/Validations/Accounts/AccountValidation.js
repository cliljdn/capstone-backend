const yup = require('yup')
const errors = {
	email: 'Please enter a valid email',
	password:
		'Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
}
module.exports = {
	registerValidation: yup.object().shape({
		email: yup
			.string()
			.trim()
			.matches(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				errors.email
			)
			.required(),
		password: yup
			.string()
			.trim()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				errors.password
			)
			.required(),
		account_type: yup
			.string()
			.trim()
			.matches(
				/^(Individual|Driver|Establishment)$/,
				'Individual, Driver, Establishment account types are only allowed'
			)
			.required(),
	}),

	loginValidation: yup.object().shape({
		email: yup
			.string()
			.trim()
			.matches(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				errors.email
			)
			.required(),
		password: yup
			.string()
			.trim()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				errors.password
			)
			.required(),
	}),

	updateValidation: yup.object().shape({
		email: yup
			.string()
			.trim()
			.matches(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				errors.email
			),

		password: yup
			.string()
			.trim()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
				errors.password
			),
	}),

	companionEmailValidate: yup.object().shape({
		email: yup.string().trim().email().required(),
	}),
}
