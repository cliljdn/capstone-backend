const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')
const { HasManyRelation } = require('./Vehicle.model')

class UserProfile extends Model {
	static get tableName() {
		return tableNames.user_profile
	}

	static get relationMappings() {
		const Vehicles = require('./Vehicle.model')
		return {
			DriverVehicles: {
				relation: Model.HasManyRelation,
				modelClass: Vehicles,
				join: {
					from: tableNames.user_profile + 'user_id',
					to: tableNames.vehicle_table + '.vehicle_id',
				},
			},
		}
	}
}

module.exports = UserProfile
