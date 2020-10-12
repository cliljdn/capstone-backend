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
		return {
			relation: Model.HasManyRelation,
			modelClass: DriverVehicles,
			join: {
				from: tableNames.driver_profile + '.driver_id',
				to: tableNames.vehicle_table + '.vehicle_id',
			},
		}
	}
}

module.exports = DriverProfile
