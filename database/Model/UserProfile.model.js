const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')
const Passengers = require('./Passengers.model')
const { HasManyRelation } = require('./Vehicle.model')

class UserProfile extends Model {
	static get tableName() {
		return tableNames.user_profile
	}

	static get idColumn() {
		return 'user_id'
	}

	static get relationMappings() {
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

			DriverScanned: {
				relation: Model.HasManyRelation,
				modelClass: Passengers,
				join: {
					from: tableNames.user_profile + '.user_id',
					to: tableNames.passengers + '.driver_id',
				},
			},
		}
	}
}

module.exports = UserProfile
