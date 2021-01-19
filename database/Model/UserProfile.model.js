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

		return {
			getNames: {
				relation: Model.HasManyRelation,
				modelClass: () => Passengers,

				join: {
					from: tableNames.user_profile + '.account_id',
					to: tableNames.travel_history + '.account_id',
				},
			},
		}
	}
}

module.exports = UserProfile
