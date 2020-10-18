const { Model } = require('objection')
const tableNames = require('../../lib/contants/TableNames')

class DriverProfile extends Model {
	static get tableName() {
		return tableNames.driver_profile
	}

	static get idColumn() {
		return 'driver_id'
	}

	static get relationMappings() {
		const DriverVehicles = require('./Vehicle.model')
		const Passengers = require('./Passengers.model')
		return {
			DriverVehicles: {
				relation: Model.HasManyRelation,
				modelClass: DriverVehicles,
				join: {
					from: tableNames.driver_profile + '.driver_id',
					to: tableNames.vehicle_table + '.vehicle_owner',
				},
			},

			DriverIdentitifier: {
				relation: Model.HasManyRelation,
				modelClass: Passengers,
				join: {
					from: tableNames.driver_profile + '.driver_id',
					to: tableNames.passengers + '.driver_id',
				},
			},
		}
	}
}

module.exports = DriverProfile
