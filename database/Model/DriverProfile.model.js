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
<<<<<<< HEAD
=======
		const Passengers = require('./Passengers.model')
>>>>>>> f24c124c6024bc84f065b2a9a950cfc0609c00f5
		return {
			DriverVehicles: {
				relation: Model.HasManyRelation,
				modelClass: DriverVehicles,
				join: {
					from: tableNames.driver_profile + '.driver_id',
					to: tableNames.vehicle_table + '.vehicle_owner',
				},
			},
<<<<<<< HEAD
=======

			Passengers: {
				relation: Model.HasManyRelation,
				modelClass: Passengers,
				join: {
					from: tableNames.driver_profile + '.driver_id',
					to: tableNames.Passengers + '.driver_id',
				},
			},
>>>>>>> f24c124c6024bc84f065b2a9a950cfc0609c00f5
		}
	}
}

module.exports = DriverProfile
