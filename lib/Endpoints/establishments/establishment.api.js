const express = require('express')
const router = express.Router()
const Establishments = require('../../../database/Model/Establishments.model')
const {
	EstablishmentProfile,
} = require('../../Validations/Establishments/EstablishmentValidation')
const EstablishmentValidation = require('../../Validations/Establishments/EstablishmentValidation')
// Creates profile to establishments
router.post('/establishment/create/profile', async (req, res, next) => {
	const { name, street, telephone, owner, email } = req.body

	try {
		const bldgData = {
			name: name,
			street: street,
			telephone_number: telephone,
			establishment_owner: owner,
			email: email,
		}

		await EstablishmentProfile.validate(
			{ email: bldgData.email },
			{ abortEarly: false }
		)

		await Establishments.query()
			.insert(bldgData)
			.then(() => {
				res.status(201).json({
					created: true,
					message: 'Created',
				})
			})
	} catch (error) {
		next(error)
	}
})

module.exports = router
