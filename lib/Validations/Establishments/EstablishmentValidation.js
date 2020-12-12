const yup = require('yup')

module.exports = {
	EstablishmentProfile: yup.object().shape({
		email: yup.string().trim().email().required(),
	}),
}
