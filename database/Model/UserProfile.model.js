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
		const TravelHistory = require('./travelhistory.model')
		const Establishment = require('./establishment.model')
		const Vechicle = require('./Vehicle.model')

		return {
			DriverPassenger: {
				relation: Model.HasManyRelation,
				modelClass: TravelHistory,

				join: {
					from: this.tableName + '.account_id',

					to: tableNames.travel_history + '.account_id',
				},
			},
		}
	}
}

module.exports = UserProfile
