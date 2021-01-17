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
		return 'account_id'
	}

	static get relationMappings() {
		const Passengers = require('./travelhistory.model')
		const Establishment = require('./establishment.model')

		return {}
	}
}

module.exports = UserProfile
