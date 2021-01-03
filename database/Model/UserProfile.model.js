const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

const { HasManyRelation, query } = require('./Vehicle.model')

class UserProfile extends Model {
	static get tableName() {
		return tableNames.user_profile
	}

	static get idColumn() {
		return 'user_id'
	}

	static get foreignId() {
		return 'profile_owner'
	}

	static get relationMappings() {
		const Passengers = require('./Passengers.model')
		const Vehicles = require('./Vehicle.model')

		return {}
	}
}

module.exports = UserProfile
