const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

const { HasManyRelation } = require('./Vehicle.model')

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
		const TravelHistory = require('./TravelHistory.model')
		const Companions = require('./Companion_Table.model')
		const Passengers = require('./Passengers.model')
		const Vehicles = require('./Vehicle.model')
		const Passenger = require('./Passengers.model')
		return {
			DriverVehicles: {
				relation: Model.HasManyRelation,
				modelClass: Vehicles,
				join: {
					from: tableNames.user_profile + '.user_id',
					to: tableNames.vehicle_table + '.vehicle_owner',
				},
			},

			DriverInfo: {
				relation: Model.HasManyRelation,
				modelClass: Passengers,
				join: {
					from: tableNames.user_profile + '.user_id',
					to: tableNames.passengers + '.driver_id',
				},
			},
			UserInfo: {
				relation: Model.HasManyRelation,
				modelClass: Passengers,
				join: {
					from: tableNames.user_profile + '.user_id',
					to: tableNames.passengers + '.users_id',
				},
			},

			Companions: {
				relation: Model.HasManyRelation,
				modelClass: Companions,
				join: {
					from: tableNames.user_profile + '.user_id',
					to: tableNames.companion_table + '.parent_id',
				},
			},

			TravelHistory: {
				relation: Model.HasManyRelation,
				modelClass: TravelHistory,
				join: {
					from: tableNames.user_profile + '.user_id',
					to: tableNames.travel_history + '.user_id',
				},
			},
		}
	}
}
module.exports = UserProfile
