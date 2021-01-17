const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class TravelHistory extends Model {
	static get tableName() {
		return tableNames.travel_history
	}

	static get relationMappings() {
		const UserProfile = require('./UserProfile.model')
		return {}
	}
}

module.exports = TravelHistory
