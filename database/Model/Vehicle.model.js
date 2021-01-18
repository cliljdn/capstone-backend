const { Model } = require('objection')
const tableConstants = require('../.././lib/contants/TableNames')

class DriverVehicles extends Model {
	static get tableName() {
		return tableConstants.vehicle_table
	}

	static get idColumn() {
		return 'plate_number'
	}
}

module.exports = DriverVehicles
