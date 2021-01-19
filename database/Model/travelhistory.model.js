const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class TravelHistory extends Model {
	static get tableName() {
		return tableNames.travel_history
	}

	static get relationMappings() {
		const UserProfile = require('./UserProfile.model')
		return {
			DriverPassenger: {
				relation: Model.HasManyRelation,
				modelClass: () => UserProfile,

				join: {
					from: tableNames.travel_history + '.account_id',
					to: tableNames.user_profile + '.account_id',
				},
			},
		}
	}
}

module.exports = TravelHistory
